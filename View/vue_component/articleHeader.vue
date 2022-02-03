<template>
    <div>
        <a href="" class="article__title" onclick='return false;'>{{ current_article.title }}</a>
        <hr class="article__line">
        <div class="article__info">
            <div>
                <span>{{ current_article.create_time }}</span>
            </div>
            <ul class="article__info-tag">
                <li v-for="tag in current_article.tag">
                    <a @Click="ShowTagArticle(tag)">{{ article_tag[tag] }}</a>
                </li>
            </ul>
        </div>
        <a class="article__img-box" :style="{ 'background-image': 'url(' + current_article.img_route + ')' }">
            <div class="article__img-content-box">
                <div class="article__img-content flex-center">
                    <div class="img-content_content" v-html="current_article.img_content"></div>
                    <hr>
                    <div class="img-content_create-time">
                        {{ current_article.create_time }}
                    </div>
                </div>
            </div>
            <p class="article__img-place-name" v-if="current_article.img_place_name != 'none' && current_article.img_place_name != ''">{{ current_article.img_place_name }}</p>
        </a>
    </div>
</template>

<script>
    module.exports = {
        props: ["current_article","article_tag"],
        data: function() {
            return { }
        },
        mounted(){

        },
        methods: {
            ShowTagArticle(tag){
                location.href = "/Tag.html?tag=" + tag;
            }
        }
    }
</script>