import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { CloudUpload } from "@material-ui/icons";
import React, { Component } from "react";
import { isSearchMatch, maxFilter } from "../services/filter-service";
import { Player } from "../services/player-service";
import { SearchField } from "./search-field";

interface OwnProps {
  players: Player[];
  handlePlayerToggle: (player: Player) => void;
  playersCompare: Player[];
}

interface State {
  searchText: string;
  bulkUploadDialogOpen: boolean;
}

type Props = OwnProps;

export class PlayersAutoComplete extends Component<Props, State> {
  public readonly state: State = {
    searchText: "",
    bulkUploadDialogOpen: false,
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
            {/* Dialog content will be implemented later */}
            <Box p={2}>
              <p>Bulk upload functionality will be implemented here.</p>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleBulkUploadClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleBulkUploadClose}
              color="primary"
              variant="contained"
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>
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
}
