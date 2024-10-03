window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = (scrollTop / windowHeight) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
};
