import '../css/index.less'
import 'video.js/dist/video-js.css';
import videojs from 'video.js'

import soshm from 'soshm'
window.videojs=videojs
window.onload = () => {
    var width=$(window).width();

    var myPlayer = videojs("example_video_1");
    myPlayer.width(width);
    // soshm('.datasetconfig', {
    //     sites: ['weixin', 'weixintimeline', 'yixin', 'weibo', 'qq', 'qzone']
    // })
    //
};