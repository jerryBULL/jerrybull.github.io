<template>
    <div class="sidebar">
        <div class="sidebar-box">
            <p class="sidebar-box__title">最新文章</p>
            <hr class="sidebar-box__line">
            <ul v-if="LatestArticle.length !== 0">
                <li v-for="article in LatestArticle">
                    <a :href="article.article_route" class="sidebar-box__article-title">{{ article.title }}</a>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <a href="javascript:void(0);" class="sidebar-box__article-title">尚未更新文章</a>
                </li>
            </ul>
        </div>

        <div class="sidebar-box">
            <p class="sidebar-box__title">分類</p>
            <hr class="sidebar-box__line">
            <ul>
                <li class="sidebar-box__category-li" v-for="(val,key) in ArticleCategory">
                    <a class="sidebar-box__category" :class="{'active':CurrenCategory==key}" @Click="ShowCategoryArticle(key)">{{ val }}</a>
                </li>
            </ul>
        </div>

        <div class="sidebar-box">
            <p class="sidebar-box__title">標籤</p>
            <hr class="sidebar-box__line">
            <div class="sidebar-box__tag-box">
                <a class="sidebar-box__tag" :class="{'active':CurrenTag==key}" v-for="(val,key) in article_tag" @Click="ShowTagArticle(key)">{{ val }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["article_tag","article"],
        data: function() {
            return {
                LatestArticle:[],
                ArticleCategory : ArticleCategory,
                //
                CurrenTag : GetURLParames("tag"),
                CurrenCategory : GetURLParames("category"),
            }
        },
        mounted(){
            this.GetLatestArticle();
        },
        methods: {
            ShowCategoryArticle(category){
                location.href = "/Category.html?category=" + category;
            },
            ShowTagArticle(tag){
                location.href = "/Tag.html?tag=" + tag;
            },
            GetLatestArticle(){
                var v_this   = this;
                
                var articles = v_this.article;
                //最新文章
                latest_article = [];
                for(article in articles){
                    latest_article.push(articles[article]);
                }

                for (let i = 0; i < latest_article.length; i++) {
                    for (let j = 0; j < latest_article.length-1; j++) {
                        if(latest_article[j]["create_time"] < latest_article[j+1]["create_time"]) {
                            let temp = latest_article[j]
                            latest_article[j] = latest_article[j+1];
                            latest_article[j+1] = temp;
                        }
                    }
                }
                latest_article.splice(5,latest_article.length-5);
                v_this.LatestArticle = latest_article;
            }
        }
    }
</script>