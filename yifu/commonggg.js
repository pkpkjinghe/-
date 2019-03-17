var itcast = {

    tap: function (dom, callback) {

        if (!dom || typeof dom != "object") {
            return;
        }
        var startX, startY;
        var startTime;
        var  distanceX=0;
        var   distanceY=0;
        dom.addEventListener('touchstart', function (e) {
            console.log(e)
            if (e.targetTouches.length > 1) {
                return;
            }
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
            startTime = Date.now();


        });
        dom.addEventListener('touchend', function (e) {
            if (e.changedTouches.length > 1) {
                return;
            }
            if (Date.now() - startTime > 150) {
                return;
            }
            var moveX = e.changedTouches[0].clientX;
            var moveY = e.changedTouches[0].clientY;
            distanceX = moveX - startX;
            distanceY = moveY - startY;
            if (Math.abs(distanceX) < 6 && Math.abs(distanceY) < 6) {
                console.log('点击是一个tap事件');
                callback && callback(e);
            }


        })
    }
}