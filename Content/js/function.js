//---------- 專案獨用 ----------
//---------- 專案獨用 ----------
//---------- 專案獨用 ----------
function GetCurrentArticleTitle(){
    var article_title = window.location.pathname;
    article_title = article_title.split('/');
    article_title = article_title[article_title.length-1];
    article_title = article_title.split('.');
    return article_title[0];
}

//---------- 判斷類 ----------
//---------- 判斷類 ----------
//---------- 判斷類 ----------
function IsArticlePage(){
    var pathname = window.location.pathname;
    pathname = pathname.split('/');
    if(pathname[1] == "Article"){
        return true;
    }
    return false;
}

function IsLiveServer(){
    if(location.hostname == "localhost" || location.hostname == "127.0.0.1"){
        return false;
    }
    return true;
}

//---------- 共用類 ----------
//---------- 共用類 ----------
//---------- 共用類 ----------
function GetURLParames(param_name = ""){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var params = {};
    sURLVariables.forEach(element => {
        var param = element.split('=');
        params[param[0]] = param[1];
    });

    if(param_name){
        return params[param_name];
    }else{
        return params;
    }
}

var CallAjax = (function(){
    var RequsetGet = function(url, param, callback, before, comple, fail){
        url      = url || "";
        param    = param || "";
        callback = callback || function () {};
        before   = before || function () {};
        comple   = comple || function () {};
        fail     = fail || function (e) {
            console.log(url);
        };
        var callurl = url + "&" + param;

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: callurl,
            timeout: 30 * 1000,
            beforeSend: function () {
                before();
            },
            complete: function () {
                comple();
            },
            success: function (result) {
                callback(result);
                if (typeof result.IsSuccess === "undefined") {
                    console.log(result);
                }
            },
            error: function (e) {
                fail(e);
            }
        });
    }

    var RequsetPost = function(url, data, callback, before, comple, fail){
        url      = url || "";
        data     = data || {};
        callback = callback || function () {};
        before   = before || function () {};
        comple   = comple || function () {};
        fail     = fail || function (e) {
            console.log(url);
        };

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            timeout: 30 * 1000,
            beforeSend: function () {
                before();
            },
            complete: function () {
                comple();
            },
            success: function (result) {
                callback(result);
                if (typeof result.IsSuccess === "undefined") {
                    console.log(result);
                }
            },
            error: function (e) {
                fail(e);
            }
        });
    }

    var RequsetPostFile = function (url, data, callback, before, comple, fail, xhr) {
        url      = url || "";
        data     = data || {};
        callback = callback || function () {};
        before   = before || function () {};
        comple   = comple || function () {};
        fail     = fail || function (e) {
            console.log(url);
        };
        xhr = xhr || function () {};

        $.ajax({
            xhr: xhr,
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            timeout: 30 * 1000,
            async: true,
            beforeSend: function () {
                before();
            },
            complete: function () {
                comple();
            },
            success: function (result) {
                callback(result);
                if (typeof result.IsSuccess === "undefined") {
                    console.log(result);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                fail(xhr, ajaxOptions, thrownError);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    };

    return {
        RequsetGet: RequsetGet,
        RequsetPost: RequsetPost,
        RequsetPostFile: RequsetPostFile
    };
}())

var alert = (function(){
    var notify = function(content,title,columnClass){
        var title       = title || '通知!';
        var content     = content || '操作成功!';
        var columnClass = columnClass || "medium";

        return new Promise((resolve, reject) => {
            $.alert({
                icon: 'fa fa-check-circle',
                columnClass: columnClass,
                title: title,
                content: content,
                type: 'blue',
                buttons: {
                    close: {
                        keys: ['enter'],
                        text: 'Try again',
                        btnClass: 'btn-red',
                        action: function(){
                            resolve("test");
                        }
                    }
                }
            });
        })
    }

    var warning = function(content,title,columnClass){
        var title       = title || '警告!';
        var content     = content || '程序出現問題，請聯絡系統管理員!';
        var columnClass = columnClass || "medium";

        $.alert({
            icon: 'fa fa-warning',
            columnClass: columnClass,
            title: title,
            content: content,
            type: 'orange',
            buttons: {
                close: {
                    keys: ['enter'],
                }
            }
        });
    }

    var error = function(content,title,columnClass) {
        var title       = title || '錯誤!';
        var content     = content || '系統有誤，請聯絡系統管理員!';
        var columnClass = columnClass || "medium";

        $.alert({
            icon: 'fa fa-bug',
            columnClass: columnClass,
            title: title,
            content: content,
            type: 'red',
            buttons: {
                close: {
                    keys: ['enter'],
                }
            }
        });
    }

    return{
        notify : notify,
        warning : warning,
        error : error,
    }
}())