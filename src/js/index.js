import '../css/index.less'
import '../css/aa.css'
import videojs from 'video.js'
import server from '../lib/index/api'

import soshm from 'soshm'
window.videojs=videojs
window.onload = () => {
    var width=$(window).width();
    var domObj={}

    var myPlayer = videojs("example_video_1");
    myPlayer.width(width);

    // soshm('.datasetconfig', {
    //     sites: ['weixin', 'weixintimeline', 'yixin', 'weibo', 'qq', 'qzone']
    // })
    //
};