export const isSearchMatch = (searchText: string, keywordsToMatch: string[]) => {
    const searchKeywords = searchText.toLowerCase().split(' ').filter(keyword => keyword !== "");
    const matchKeywords = keywordsToMatch.map(keyword => keyword.toLowerCase())

    for(const searchKeyword of searchKeywords){
        let isMatch = false;
        for(const matchKeyword of matchKeywords){
            if(searchKeyword === matchKeyword.slice(0, searchKeyword.length)){
                isMatch = true;
                break;
            }
        }
        if(!isMatch){
            return false;
        }
    }

    return true;
}
