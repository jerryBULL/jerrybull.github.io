if(IsArticlePage()){
    $(function(){
        $("header").load("../../../View/header.html");
        $("footer").load("../../../View/footer.html");
    
        let ArticleBody = new Vue({
            el:".body",
            components: {
                'sidebar-component': httpVueLoader('/View/vue_component/sidebar.vue')
            },
            data:function(){
                return{
                    ArticleTag:ArticleTag,
                    Article:Article,
                    CurrentArticle:{}
                }
            },
            mounted(){
                var v_this = this;
                var CurrentArticleTitle = GetCurrentArticleTitle();
                if(CurrentArticleTitle.toLowerCase() === "demo"){
                    v_this.CurrentArticle = {
                        title : "Demo",
                        tag : ["html","css"],
                        category : "front_end",
                        create_time : "2021/08/14",
                        img_route : "/Content/img/Article/2021/08/Demo/Demo.jpg",
                        article_route:"/Article/2021/08/Demo.html",
                    }
                }else{
                    v_this.CurrentArticle = v_this.Article[CurrentArticleTitle];
                }
            },
            methods: {
                ShowTagArticle(tag){
                    location.href = "/Tag.html?tag=" + tag;
                }
            }
        })
    
        if(typeof(lightbox) !== "undefined"){
            lightbox.option({
                'resizeDuration': 200,
                'disableScrolling' :true,//禁用滾輪
            })
        }
    })
}

var ArticleFuntion = (function(){
    /**
     * @param string tag 設定的文章類型
     * @return array 返回對應的文章類型
     */
    var FilterArticleTag = function(tag = "html"){
        var filteTag = tag.toLowerCase();
        var ArticleTagList = [];
        var article_array  = [];
        for(article in Article){
            article_array.push(Article[article])
        }

        article_array.forEach((articleInfo,key) => {
            var articleTag = articleInfo.tag;

            if($.inArray(filteTag, articleTag) != -1){
                ArticleTagList.push(article_array[key])
            }
        });
        return ArticleTagList;
    };

        /**
     * @param string category 設定的文章類型
     * @return array 返回對應的文章類型
     */
    var FilterArticleCategory = function(category = "html"){
            var filteCategory = category.toLowerCase();
            var ArticleCategoryList = [];
            var article_array  = [];
            for(article in Article){
                article_array.push(Article[article])
            }
    
            article_array.forEach((articleInfo,key) => {
                var articleCategory = articleInfo.category;
    
                if(filteCategory === articleCategory){
                    ArticleCategoryList.push(article_array[key])
                }
            });
            return ArticleCategoryList;
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
        FilterArticleCategory : FilterArticleCategory,
        FilterArticleCreateTime : FilterArticleCreateTime,
    }
}());