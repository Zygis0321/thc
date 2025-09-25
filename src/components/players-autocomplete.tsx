import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { CloudUpload } from "@material-ui/icons";
import React, { Component } from "react";
import { isSearchMatch, maxFilter } from "../services/filter-service";
import { Player } from "../services/player-service";
import { SearchField } from "./search-field";
import { ErrorMessage } from "./error-message";

interface OwnProps {
  players: Player[];
  handlePlayerToggle: (player: Player, forceAdd?: boolean) => void;
  playersCompare: Player[];
}

interface State {
  searchText: string;
  bulkUploadDialogOpen: boolean;
  bulkUploadText: string;
  bulkUploadLoading: boolean;
  showError: boolean;
}

type Props = OwnProps;

export class PlayersAutoComplete extends Component<Props, State> {
  public readonly state: State = {
    searchText: "",
    bulkUploadDialogOpen: false,
    bulkUploadText: "",
    bulkUploadLoading: false,
    showError: false,
  };

  render(): React.ReactNode {
    return (
      <>
        <SearchField
          label="Players"
          searchText={this.state.searchText}
          onChange={this.handleSearchChange}
          helperText="Search by player name, nation or club"
        />
        <Box textAlign="center">
          <Button
            color="primary"
            startIcon={<CloudUpload />}
            onClick={this.handleBulkUploadClick}
            style={{ textTransform: "none", textDecoration: "underline" }}
          >
            Bulk Upload Players
          </Button>
        </Box>
        <List dense>
          {!this.props.players.length
            ? Array.from(new Array(10))
            : maxFilter<Player>(
                this.props.players,
                (p) =>
                  isSearchMatch(this.state.searchText, [
                    ...p.name.split(" "),
                    ...p.nationName.split(" "),
                    ...p.club.split(" "),
                  ]),
                10
              ).map((player) => {
                return player ? (
                  <ListItem
                    key={player.id}
                    button
                    onClick={() => this.props.handlePlayerToggle(player)}
                  >
                    <ListItemText
                      id={player.id + player.name}
                      primary={player.name}
                      secondary={player.club}
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={() => this.props.handlePlayerToggle(player)}
                        checked={this.props.playersCompare.some(
                          (p) => p.id === player.id
                        )}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ) : (
                  <Box pt={2} pl={1} pr={1}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                );
              })}
        </List>

        <Dialog
          open={this.state.bulkUploadDialogOpen}
          onClose={this.handleBulkUploadClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Bulk Upload Players</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Paste player names"
              placeholder="Paste player names here..."
              multiline
              rows={8}
              fullWidth
              variant="outlined"
              value={this.state.bulkUploadText}
              onChange={this.handleBulkUploadTextChange}
              helperText="Paste player names in any format. The system will match them by name only."
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleBulkUploadClose}
              color="primary"
              disabled={this.state.bulkUploadLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleBulkUploadSubmit}
              color="primary"
              variant="contained"
              disabled={
                this.state.bulkUploadLoading ||
                !this.state.bulkUploadText.trim()
              }
              startIcon={
                this.state.bulkUploadLoading ? (
                  <CircularProgress size={20} />
                ) : undefined
              }
            >
              {this.state.bulkUploadLoading ? "Processing..." : "Upload"}
            </Button>
          </DialogActions>
        </Dialog>

        <ErrorMessage show={this.state.showError} />
      </>
    );
  }

  private readonly handleSearchChange = (text: string): void => {
    this.setState({ searchText: text });
  };

  private readonly handleBulkUploadClick = (): void => {
    this.setState({ bulkUploadDialogOpen: true });
  };

  private readonly handleBulkUploadClose = (): void => {
    this.setState({ bulkUploadDialogOpen: false });
  };

  private readonly handleBulkUploadTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ bulkUploadText: event.target.value });
  };

  private readonly handleBulkUploadSubmit = async (): Promise<void> => {
    if (!this.state.bulkUploadText.trim()) return;

    this.setState({ bulkUploadLoading: true });

    try {
      const response = await fetch(
        "https://extract-players-237824890762.europe-west1.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: this.state.bulkUploadText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.players && Array.isArray(data.players)) {
        // Match extracted player names with existing players
        data.players.forEach((playerName: string) => {
          const matchedPlayer = this.props.players.find((player) =>
            isSearchMatch(playerName, player.name.split(" "))
          );

          if (matchedPlayer) {
            this.props.handlePlayerToggle(matchedPlayer, true);
          }
        });
      }

      // Close dialog and reset text
      this.setState({
        bulkUploadDialogOpen: false,
        bulkUploadText: "",
        bulkUploadLoading: false,
      });
    } catch (error) {
      console.error("Error extracting players:", error);
      this.setState({
        bulkUploadLoading: false,
        showError: true,
      });
    }
  };
}
