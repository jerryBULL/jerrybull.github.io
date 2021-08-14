var ArticleFuntion = (function(){
    /**
     * @param string tag 設定的文章類型
     * @return array 返回對應的文章類型
     */
    var FilterArticleTag = function(tag = "html"){
        var filteTag = tag.toLowerCase();
        var ArticleTagList = [];
        Article.forEach((articleInfo,key) => {
            var articleTag = articleInfo.tag;

            if($.inArray(filteTag, articleTag) != -1){
                ArticleTagList.push(Article[key])
            }
        });
        return ArticleTagList;
    };

    /**
     * @param string time 日期(2021/08)
     * @param string format 過濾深度(Y到年/M到月)
     * @return array 返回對應的文章類型
     */
    var FilterArticleCreateTime = function(time,format = "y"){
        var filteTime = time.split("/");
        var ArticleTimeList = [];
        Article.forEach((articleInfo,key) => {
            var articleTime      = articleInfo.create_time.split("/");
            var articleTimeYear  = articleTime[0];
            var articleTimeMonth = articleTime[1];

            if(format.toLowerCase() == "m"){
                if(filteTime[1] === articleTimeMonth){
                    ArticleTimeList.push(Article[key])
                }
            }else{
                if(filteTime[0] === articleTimeYear){
                    ArticleTimeList.push(Article[key])
                }
            }
        });
        return ArticleTimeList;
    };

    return {
        FilterArticleTag : FilterArticleTag,
        FilterArticleCreateTime : FilterArticleCreateTime,
    }
}());