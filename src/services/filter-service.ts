export const isSearchMatch = (searchText: string, keywordsToMatch: string[]) => {
    const searchKeywords = searchText.toLowerCase().split(' ').filter(keyword => keyword !== "");
    const matchKeywords = keywordsToMatch.map(keyword => keyword.toLowerCase())

    for(const searchKeyword of searchKeywords){
        let isMatch = false;
        for(const matchKeyword of matchKeywords){
            let isKeywordMatch = true;
            if(matchKeyword.length < searchKeyword.length){
                continue;
            }
            for(let i=0; i<searchKeyword.length; i++){
                if (searchKeyword[i] !== matchKeyword[i]){
                    isKeywordMatch = false;
                    break;
                }
            }
            if(isKeywordMatch){
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

export function maxFilter<T>(array: T[], condition: (value: T) => boolean, limit: number): T[]{
    let filteredArray: T[] = []

    for(const item of array){
        if(filteredArray.length >= limit){
            break;
        }

        if(condition(item)){
            filteredArray.push(item);
        }
    }

    return filteredArray;

}
