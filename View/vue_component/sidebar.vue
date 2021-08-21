<template>
    <div class="sidebar">
        <div class="sidebar-box">
            <p class="sidebar-box__title">最新文章</p>
            <hr class="sidebar-box__line">
            <ul>
                <li v-for="article in LatestArticle">
                    <a :href="article.article_route" class="sidebar-box__article-title">{{ article.title }}</a>
                </li>
            </ul>
        </div>

        <div class="sidebar-box">
            <p class="sidebar-box__title">標籤</p>
            <hr class="sidebar-box__line">
            <a class="sidebar-box__tag" v-for="(val,key) in article_tag" @Click="show_tag_article(key)">{{ val }}</a>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["article_tag","article","show_tag_article"],
        data: function() {
            return {
                LatestArticle:[]
            }
        },
        mounted(){
            this.GetLatestArticle();
        },
        methods: {
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