background = null;
var loadedBack = null;
var currentBGInfo = null;
var version = '{{#vernum}}';
var rAdsCount = 0;

var oddball = {
  refresh: false,
  hideBacks: false,
  refreshAngle: 0,
  holiday: false
};

var payload = {
  toggles: {
    SSSC_Enable: false,
    SSSC_Long: false,
    SSSC_Long_Minus70: false,
    SSSC_Rezied: false,
    AWSC_Enable: true,
    AWSC_Long: true,
    AWSC_Long_Minus70: false,
    AWSC_Resized: false,
    WSSC_Enable: false,
  },
  cropInfo: {
    order: {
      AWSC: 1,
      SSSC: 2,
      WSSW: 3,
    },
    customHeight: {
      AWSC: null,
      SSSC: null,
    }
  },
  background: null,
  esColor: 0,
};

var bgSaveInfo = {
  url: null,
  images: [],
};

var gAds = [
  '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-6718897784778373" data-ad-slot="7589608163" data-ad-format="auto"></ins>',
  '<ins class="adsbygoogle" style="display:inline-block;width:930px;height:180px" data-ad-client="ca-pub-6718897784778373" data-ad-slot="3019807768"></ins>',
  '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-6718897784778373" data-ad-slot="4177836562"></ins>'
];

var backgroundsList = [
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGBp7RJxO94PvF90-StAl5z5OYSUWTjFxbU02aQe-apwlFmMZUsfRmhkpsZu94EC595SOKo4TzXhQ',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhlssMAiXk4kwJ_MbbiZTIzc12VVfgOBKdipgm4D3E2vZA6Vo7m8bpffg6-vYLPLepsZ4si3kth',
  'http://cdn.steamcommunity.com/economy/image/tlNaNU_g3XH6RFG0zV3r-w4fkIQLkNMxLoqCrim7o1x_WG3OFvybY1qdTUrrPaVxAwqJl17SkSklh5-2KLiiW3Jcfo4I9IhhW8ABTPJ3u3ZJWdXMA4zMc3zWjqk2rbMJLlYulAf_3TNY1hoX5SLlNQNfhsNQiM49edff9zD84FwwX23G',
  'http://cdn.steamcommunity.com/economy/image/VIUbvgoMQo2PJ7q9EJSHpOzJ0Q9OfEzNW-lpp_RyzwOdjixFUxAEny_-pkM29Mku4dzIHBs-DtVQ5HS_9XHOBJCKPwVNGBedLqPqRS--1ymrj5RHRmBTjwzrMaPvMd0FytpsExZCFMMv5PcVOeOIY-CEwUdGYVaQB-w1o75iiwDSiSxN',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAprVJxe94baMhhbP9Cl53v-NAXDzjSkON1D-cfLr3kQVgNZF_ckurx5tMuoxSXJ95SOK8Ro2GBQ',
  'http://cdn.steamcommunity.com/economy/image/-L4j3a-QwWvDV8NCunNMtUDy6Wzr4M8rF5kQWF6VBBIxtRQm9oyHeWOO37ycEwI_Tefwf76ijTMclA1AX5YFFTyxB2bohJR7YtOTuoVZHDgHtKUv5_fQaUfESA1A0EcUYe5Tcbjalyk2loXgxVpALRq0qiSyq9Z_QstNAUbXQhN-shQu',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGBpLZBwO94bqZ81OmsWQso7bJOUWbqGxOF3mTBebr6wFBtYJ0tJEz0wpwe7dkGWJ95SOK5GoWH9w',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGBpbZIwO94OaYh0bOkDQ8oueUSV2bjSUaM3mWWfL36kQZhYMEucUjww55K6doGUZ95SOLfgjg9EA',
  'http://cdn.steamcommunity.com/economy/image/Zp_2ZGvfczsLttxIS01TA97TPNUvr31733gPUq-rG6SvlMGfMsM1KatvwLZtLR2J08YlxnrtP2PUdRJKrqgao6KQ0t8syyYrqjKMsHRnA46ZlXmdJ7NiOYokVQK2vQqgr86Gxn2WcH7_J5TrNzEIm9PCK512tWtwin8AVrjrC_ngk8GX',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGBr7RNwu94b6kh1rL6XF9w7e5DAjG2FkeH1jSQKb37nVE0NpwqdRmmlptM5o8BCp95SOLQrFOUKA',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGApbZLxO94aKQo1-asX1kp6uZPUjzrHkeHgTDBfe-rxlljYJQqdkrxyMwb7Y0CDJ95SOIWw5bAzQ',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGApLZNyO94b6h_hej9DFQmu-ZHAjDlGEHW0TLHK-arklBlPZx8JkrxxJhI7t5eUJ95SOKYaskhXw',
  'http://cdn.steamcommunity.com/economy/image/dIYw9S9LGCpyDKnFVrgkrMzK-kRrOxZqpsJ637JebAu9jQcOdldeONLVtTtw2Gomwd_jVz55VHKtz2fHs11tDLCJFE5oX00604j5PWmSdCGLjL8MYycJKPbFdY_9SyAKv4URADFTGGmDy7MxKJF8ZsHdugUyIwxloJ52iP5OLwjyigcG',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGApLZNyO94ZPIqg-f_CFwov7USBjSwFxLT1zeXfeuqwAQ3MZwnJ06gxpwfv4xUWp95SOIxq0nqrw',
  'http://cdn.steamcommunity.com/economy/image/uzXhRtM1Nd4Zk79t4hni5AN5K_eXRTuezV1sdwb_qkNyPta9iilzzLlKo5PEeaxuDmwy5MIHeYbGUHFvB_yrRH86xf2UIWDOuBfvld0zsmlEP26_n1kk3JEMNCYe779HcWuf5cwqY8q5UPDNnmW-flNoZrDLXS3FmQFmd0m-7kU9Oda1',
  'http://cdn.steamcommunity.com/economy/image/MtXlHWF55M17HMMx2SfBJ4qZL6wlCeqNr9IQKz3BiYD73tLmOGWi39vF38__R4-th4w2v3BLqJWk3w0zPMKIh_bawaYmbbHd2piTyeYNkarN32PkLBH1z_qBGnwrhsjcooXDvncztILd3ISSpA7I7drbPu4nFfTZ_I5BcyXTzNS02dLu',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhgvMAHiXlukAQqbbTsNjQ_K13EAqNbBaQ88lHuCCVku8Y3DI7ipOJTKwvq59eULepsZx-Fpjs_',
  'http://cdn.steamcommunity.com/economy/image/rQ7gZXEkjBGjsMg5Or1BcBVCKtQ1VIJRd34bI95bCddkBdeeKDjKAwNp1Mcc3Q_6GFczx2AWwEl8cwY731gI0GkBxN42MNkBAjSYwQWXEf1SBG-SPkidEyN_R3bATEWAY1uWwWpliVJWdoOdFZQZv05SZpw6SM5ZI3xCIclNS4ArAteW',
  'http://cdn.steamcommunity.com/economy/image/sfR45LDLPdnSVqFMYlp9cQm4slX0uzOZBphyVoa8NdZ4_08f6dd7y3KPvbJEOjP7BK2rRqH5cYENlW9Oh7800XX7XF_332jJc9LxtF1wLfxO_vUW-6Us2weZLlXJ_iOFLqBbEvvUO8sjwOa5T3ch7lT7ohWtoHiWUZkuAM33cII3-E8X',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1Ihts8gNiXk-xlYsNbO2Y241JFXGU6EIXqxipgvoWSVnscI2V4WzpO0CeF_ns4qTLepsZ5Tim8WM',
  'http://cdn.steamcommunity.com/economy/image/egvugw4EkL-or6YqpmdFWcJHJDJKdJ7_fGF1MEKBDf6zANl4VxjWrQh2utSABwvTz1I9IR823Od3bGgoQ4IM-b4EyjhJEMWvCSv20plNFdSFAWB0RG-BvS41LDBUxUGq5QvLIxNIxfpZbb-I1EtOnpIAZHcUb9TzLWYoNVnFGq_8B9lw',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhgvMAHiXk6lAR9YrPjNDVlK1HDVvRfXvY58FjuDXZjscQ1VY7lo7kFe126vIbHLepsZ2INpctV',
  'http://cdn.steamcommunity.com/economy/image/t86yq5cpAaCwRYDLpsptCA-CeBrTWQ_gZItT0UIsJa9-xYVQzjVHshCcnDWAqiOCApdhCYYbTfhvhk7JQy8kqHPBlhDQPVSwEcHQM5ngPYVIxDRT3UIQojjZDIAOazL-esvABoFmV7YRi55p37ZilQbAaAvbRBDpMN1ZhltvN_kxwoVY',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1Ihhs8kBiXk5yFh9ZbHtYTIxI1PHB_NdWa0-o1i5UCZkvMM1DILj875SeAW-ttaVLepsZ16V6HJk',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGApbVNxu94aaB6guT5WAsl6eYSUzS2GUnR0TfHKeiplgJsPZN_dUyrx8kbutpUXJ95SOI5AtY8rw',
  'http://cdn.steamcommunity.com/economy/image/nIVT_Trkt6lru8Y-XYMADyTJmUx-lLnpv3UVJLllSKhVjmQGY_jxu8ti2sB7406FKdyAXyvW-_G0eAg8uGZJr1iKd0Z98OK5yj-WxmKpUIJjj94Nd4imq7sgHiSnclivA4B3DHek5biZKoCbdfkMlXSL1Ap92q6y4ihOffJ0D_saiWQO',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhjscMHiXlqkAUpN7rnY242dFOXBfhfDqBopVjtUSRluJ82AtPmp-5QK1-5ttCQLepsZ2Js7cg7',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhgtMEAiXk8kgMiMrXhNTJlJF2UWfcKBKM-plvtW3Fgu5U7UYK3pLlVKgvts4DBLepsZ5UWXj2j',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGBr7ZMx-94O_Ys17P4CFwivrRGXTblSxOA1z6Qcb37xVM2N8Undhrxw5lN7dhVUZ95SOKr6GN5Nw',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhntMUBiXk7wAUvbbezYGFlJVXAWfFYCKdvow3tCyMwvcI1V4S38b9ffAXntdPALepsZ5iNQ86u',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAp7ZNwe94ZfMv2Of5CF8n7bMVVTDjH0eA1jSSLr73xwVtZpR4cBuqxZcc6NdeWp95SOKzz5hkZg',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhttccBiXk-lwd_NrvmZDUyK1ORWPNbDq1irFq-XHFm65A6VtLvorpTKA_utdPOLepsZylT2C2c',
  'http://cdn.steamcommunity.com/economy/image/dJuUMJnFLLZMajdZDGbv28zXXoHdtSL2mKTkQ-iAp3y9kKPLwNlqpOyzK6cqBqFRwcJHkoj3YO6Tqflb6YOme7CUsIve0Xmm7e5noTNMv1aLmhvD16oiosT16UCnleIhusjgwIDee6KwpCmscEiwQJPCSMnU-G-qzfLvEqXD4jeWrZQ=',
  'http://cdn.steamcommunity.com/economy/image/YUW2gparb2KJ3RQroMNoDdkJfDPS22EiXRPHMUQlIKqoToF5z7cpcCkECNWGoyaH1BxlIIeZIzpWHtopRSYhraVKkjnRvzpyKFlE05_pOICeTzx22MF-YA8Wm2ZbZDH_qBbDd4u0bnN1GQ-O3u00ldUYPHbRzCh_CESeNlIzYv_nSYFx',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1Ihhs8kBiXk4xlMuY7rhNTVmc1WSUKUGWK1ioA6-WXVisZ5mUoWzpuwDfwXpsYPCLepsZ3N1ARHC',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IhsvMgMiXk-yVgjZOLiY29jI1yUBfcLWqM49wvvXSM3up8xANWw9u5ecA3tsIqSLepsZxGYyNE_',
  'http://cdn.steamcommunity.com/economy/image/4pqc9ZWgcwNGJ1N3QsQXNFrWVkTR0H1DkumAbaYiX5MrkasOzLw1Eeb-T4lkpFm-V8NPV4SSP1uZ5J11pyFelCaVuE7StCYT56MDj33uR7kdkBYB28piAcbo3W_tY02TKc7uUoK9chbk4h7Sa7kfrgaaQ1fdzjQbzrvcaL1iHpBklqsG',
  'http://cdn.steamcommunity.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywUlj3Hz8JQD_k62zmnzAEbeQUdVBitsTVCj831QvuYDe0T1IllsMAAiXluwAJ9YbC3NGcyIAGXVfEMDaFqowm7XSVh6sNlB47n8-JVcVrrtdOTLepsZwltQqgs',
  'http://cdn.steamcommunity.com/economy/image/UQntbeGsl5e7PBNvSM7QDulFJ9yl3JnXb_LAdawomKmYAtqWuLDRhRvlD5Furp6E5FA-z_Ce289k_91trSuZrpUGydamuMKHGrhDl3fkgIOuA2acqMeGlTmnkXa3aNqvz1ydnPrjlIVL_VnINeKJxeVVMM-uxdeLPvCaJbZqj_TXBdqe',
  'http://cdn.steamcommunity.com/economy/image/8YYJSqNZlPbeDuryEvukYUnKw_vnKZq2CsA56PYd7MY4jT6x-kXS5H7X9gw0m-rrRN_a6LJr2K4BzSTw9x7twTWJLfHkTcHmf4q6Ci3R9OwOhoK77SmB7AzHNrrvV67Aa9B67b4SlLYpnKZSbtau-xGI1bPlYNfrXZJivblZtskphw==',
  'http://cdn.steamcommunity.com/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGApbNPwO94PqMp1rKsD14mvOUTVj2yF0DQgWWVe-b6lFI2ZpZ_IBnzkcsb79hSDJ95SOLwP2SMpQ'
];

var donators = [
  '76561198055336237',
  '76561198369942542',
  '76561198048498731',
  '76561198028933492',
  '76561198015966799',
  '76561198120160633',
  '76561198354093369',
  '76561198111211059',
  '76561198071282886',
  '76561198083625927',
  '76561198078940441',
  '76561198047151845'
];

var banners = [
  ['donations.jpg', 'https://paypal.me/steamdesign'],
  ['noads.jpg', 'https://i.imgur.com/g9C38bN.gif'],
  ['song.jpg', 'https://www.youtube.com/watch?v=r50JFfofHes'],
  ['git.jpg', 'https://www.github.com/SAPIC/SAPIC']
];

var leftOffset = {
  0: 508,
  1: 648,
  2: 188,
  3: 545
};

var ImagesNames = {
  0: ['#avatar', 'Avatar.png'],

  10: ['#big1', 'Artwork_Middle.png'],
  11: ['#r11', 'Artwork_Right_Top.png'],
  12: ['#r12', 'Artwork_Right_Middle.png'],
  13: ['#r13', 'Artwork_Right_Bottom.png'],

  20: ['#big2', 'Screenshot_Middle.jpg'],
  21: ['#r21', 'Screenshot_Right_Top.jpg'],
  22: ['#r22', 'Screenshot_Right_Middle.jpg'],
  23: ['#r23', 'Screenshot_Right_Bottom.jpg'],

  30: ['#w1', 'Workshop_Left.png'],
  31: ['#w1', 'Workshop_Middle_Left.png'],
  32: ['#w1', 'Workshop_Middle_Right.png'],
  33: ['#w1', 'Workshop_Right.png'],
};

var randomBackground = function() {
  var bg = backgroundsList[Math.floor(Math.random() * backgroundsList.length)];
  if (typeof bg !== 'string') {
    currentBGInfo = bg;
    console.log(bg.hls);
    var httpsLink = bg.steamUrl.replace('http://cdn.akamai.steamstatic.com/', 'https://steamcdn-a.akamaihd.net/');
    return httpsLink || 'https://steam.design/image/' + bg.url + '.jpg';
  } else {
    currentBGInfo = null;
    return bg;
  }
};

function getImageBase64(image, fn) {
  $('#bgImgEl').attr('src', null);

  $('#bgImgEl').attr('src', image);
  $('#bgImgEl').one("load", function() {
    loadedBack = image;
    fn();
  });
}

function noAds() {
  var bn = banners[Math.floor(Math.random() * banners.length)];
  $('.underfr').empty().html('<a href="' + bn[1] + '" target="_blank"><img src="./images/' + bn[0] + '"></a>');
  $('.rColAds').remove();
  $('.profile_badges').show();
}

function reloadAds() {
  if (!window.localStorage) return;
  if (rAdsCount % 10 !== 0) {
    rAdsCount++;
    return;
  }
  rAdsCount++;

  var userId = window.localStorage.getItem('SteamId');
  if (donators.indexOf(userId) !== -1) {
    return noAds();
  }

  $('.rColAds').html(gAds[0]);
  (adsbygoogle = window.adsbygoogle || []).push({});

  $('#bottomAds').html(gAds[1]);
  (adsbygoogle = window.adsbygoogle || []).push({});

  if (!userId) {
    $('#topAds').html(gAds[2]);
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
}

function reloadImages() {
  if (!window.localStorage) return;
  if (window.location.hash && window.location.hash.indexOf('#login') == -1 &&
    window.location.hash.indexOf('#logout') == -1) {
    var bg = window.location.hash.slice(1);
    if (bg.indexOf('http') == -1) {
      bg = "https://" + bg;
    }
    window.localStorage.setItem('bg', bg);
  }
  $('#cSize').css('height', '');
  background = window.localStorage.getItem('bg');
  if (background === null) {
    background = randomBackground();
    window.localStorage.setItem('bg', background);
  }

  $('#bg1').css("background-image", "url('" + background + "')");
  $('#bg2').css("background-image", "url('" + background + "')");

  if (background != loadedBack) {
    getImageBase64(background, function() {
      console.log('The current background URL is:', background);
      payloadHandler();
      reloadAds();
    });
  } else {
    CropImages();
  }
}

function CropImages() {
  setTimeout(function() {
    var bgWidth = $('#bgImgEl').width();
    var ImageType = bgWidth > 2000 ? 1 :
      bgWidth <= 1280 ? 2 :
      bgWidth == 2000 ? 3 : 0;
    var h1 = $('#hBig1').height();
    var h2 = $('#hBig2').height();
    var rOffset1 = $('#hBig1').offset().top - $('.profile_header').offset().top + 1;
    var rOffset2 = $('#hBig2').offset().top - $('.profile_header').offset().top + 1;
    var rOffset3 = $('#w1').offset().top - $('.profile_header').offset().top + 1;
    var akdk = h1 - 70;

    bgSaveInfo = {
      url: background,
      images: [],
    };
    payload.background = background;
    if (payload.toggles.AWSC_Enable) {
      if (payload.toggles.AWSC_Long) {
        if (payload.toggles.AWSC_Long_Minus70) {
          fillImage($('#big1'), leftOffset[ImageType], rOffset1, 506, h1, ImagesNames[10][1], true);
          fillImage($('#r11'), 514 + leftOffset[ImageType], rOffset1, 100, akdk, ImagesNames[11][1]);
        } else {
          fillImage($('#big1'), leftOffset[ImageType], rOffset1, 506, h1, ImagesNames[10][1], true);
          fillImage($('#r11'), 514 + leftOffset[ImageType], rOffset1, 100, h1, ImagesNames[11][1]);
        }
      } else {
        fillImage($('#big1'), leftOffset[ImageType], rOffset1, 506, h1, ImagesNames[10][1], true);
        fillImage($('#r11'), 514 + leftOffset[ImageType], rOffset1, 100, 80, ImagesNames[11][1]);
        fillImage($('#r12'), 514 + leftOffset[ImageType], rOffset1 + 93, 100, 80, ImagesNames[12][1]);
        fillImage($('#r13'), 514 + leftOffset[ImageType], rOffset1 + 186, 100, 80, ImagesNames[13][1]);
      }
    }
    if (payload.toggles.SSSC_Enable) {
      if (payload.toggles.SSSC_Long) {
        if (payload.toggles.SSSC_Long_Minus70) {
          fillImage($('#big2'), leftOffset[ImageType], rOffset2, 506, h1, ImagesNames[20][1], true);
          fillImage($('#r21'), 514 + leftOffset[ImageType], rOffset2, 100, h1, ImagesNames[21][1]);
        } else {
          fillImage($('#big2'), leftOffset[ImageType], rOffset2, 506, h1, ImagesNames[20][1], true);
          fillImage($('#r21'), 514 + leftOffset[ImageType], rOffset2, 100, h1, ImagesNames[21][1]);
        }
      } else {
        fillImage($('#big2'), leftOffset[ImageType], rOffset2, 506, h2, ImagesNames[20][1], true);
        fillImage($('#r21'), 514 + leftOffset[ImageType], rOffset2, 100, 80, ImagesNames[21][1]);
        fillImage($('#r22'), 514 + leftOffset[ImageType], rOffset2 + 93, 100, 80, ImagesNames[22][1]);
        fillImage($('#r23'), 514 + leftOffset[ImageType], rOffset2 + 186, 100, 80, ImagesNames[23][1]);
      }
    }
    if (payload.toggles.WSSC_Enable) {
      fillImage($('#w1'), 1 + leftOffset[ImageType], rOffset3, 150, 150, ImagesNames[30][1]);
      fillImage($('#w2'), 156 + leftOffset[ImageType], rOffset3, 150, 150, ImagesNames[31][1]);
      fillImage($('#w3'), 309 + leftOffset[ImageType], rOffset3, 150, 150, ImagesNames[32][1]);
      fillImage($('#w4'), 464 + leftOffset[ImageType], rOffset3, 150, 150, ImagesNames[33][1]);
    }

    fillImage($('#avatar'), leftOffset[ImageType] - 9, 34, 164, 164, ImagesNames[0][1]);

    payload.bgSaveInfo = bgSaveInfo;
    $(".saveButton").attr("href", "https://steam.design/raw/" + btoa(JSON.stringify(bgSaveInfo)));
  }, 250);
}

function fillImage(element, x, y, w, h, name, changeCss) {
  if (!name) {
    name = 'unknownImage.png';
  }
  if (changeCss) {
    element.css("width", "100%");
    element.css("height", "100%");
  }
  element.css("background", "url('" + background + "') no-repeat");
  element.css("background-position", '-' + x + 'px -' + y + 'px');

  bgSaveInfo.images.push({
    name: name,
    x: Math.floor(x),
    y: Math.floor(y),
    w: Math.floor(w),
    h: Math.floor(h),
  });
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function createInventory(id) {
  if (!window.localStorage) return;
  var getitems = store.get('backpack');
  if (getitems && getitems.backgrounds !== null) {
    doInventoryThings(getitems);
  } else {
    var expire = Date.now() + 86400000;
    $.ajax('https://steam.design/backpack/' + id + '/items.json').done(function(data) {
      store.set('backpack', data, expire);
      if (data.backgrounds === null) {
        return privateInventory();
      }
      doInventoryThings(data);
    });
  }
  $("#hideBacksList").show();
  $("#refreshInventory").show();
  $(".filter").show();
  $(".guide").css("left", "0px");
}

function doInventoryThings(inventory) {
  var hide = store.get('hide');
  if (oddball.refresh === true) {
    clearInterval(oddball.refreshAngle);
    $("#refreshInventory").rotate({
      animateTo: 0
    });
    oddball.refresh = false;
  }

  inventory.backgrounds.forEach(function(back) {
    var httpsLink = back.actions[0].link.replace('http://cdn.akamai.steamstatic.com/', 'https://steamcdn-a.akamaihd.net/');
    if (hide === true) {
      $('.backsList').addClass('backsListHide');
    }
    var itemHolder = $("<div>", {
      class: "itemHolder",
      alt: back.name.toLowerCase()
    });
    var item = $("<div>", {
      class: "item app753 context6 activeInfo"
    });
    var bgUrl = $("<a>", {
      href: "#" + httpsLink,
      class: "inventory_item_link"
    });
    var img = $("<img>", {
      src: "https://steamcommunity-a.akamaihd.net/economy/image/" + back.icon_url + "/96fx96f"
    });
    $(bgUrl).append(img);
    $(item).append(bgUrl);
    $(itemHolder).append(item);
    $('#backsList').append(itemHolder);
  });
}

function privateInventory() {
  $('#backsList').text("Either your inventory has no backgrounds, or is private.");
  $('#backsList').css("text-align", "center");
}

function refreshInventory() {
  if (!window.localStorage) return;
  store.remove('backpack');
  $('#backsList').addClass('backsListHide');
  setTimeout(function() {
    $(".itemHolder").each(function() {
      $(this).remove();
    });
    userId = window.localStorage.getItem('SteamId');
    $.ajax('https://steam.design/backpack/' + userId + '/itemsRefresh.json').done(function(data) {
      var expire = Date.now() + 86400000;
      store.set('backpack', data, expire);
      doInventoryThings(data);
      setTimeout(function() {
        $('#backsList').removeClass('backsListHide');
      }, 20);
    });
  }, 150);
}

function loginFunc() {
  if (!window.localStorage) return;
  if (window.location.hash.indexOf('#login') !== -1) {
    var userId = window.location.hash.substr(window.location.hash.indexOf("&openid.identity") - 17, 17);
    window.localStorage.setItem('SteamId', userId);
    window.location.href = window.location.href.split('#')[0];
  }
  if (window.location.hash.indexOf('#logout') !== -1) {
    window.localStorage.removeItem('SteamId');
    window.location.href = window.location.href.split('#')[0];
  }
}

function addArrows() {
  $('.profile_customization_header').not('.guide').each(function() {
    $(this).prepend('<span style="float: right" class="arrow down" onclick="moveElem(this,2);">Down <div class="fa fa-arrow-down" style="font-size:17px;"></div></span>' +
      '<span style="float: right" class="arrow up" onclick="moveElem(this,1);"">Up <div class="fa fa-arrow-up" style="font-size:17px;"></div></span>');
  });
}

function moveElem(elem, direction) {
  elem = $(elem).parent().parent();
  var x;
  if (direction == 1) {
    var elemprev = $(elem).prev('.profile_customization');
    elemprev.find('.locationvar').val($(this).val + 1);
    x = elemprev;
    $(x).before(elem);
  } else if (direction == 2) {
    x = $(elem).next('.profile_customization');
    $(x).after(elem);
  }
  $.smoothScroll({
    offset: $(elem).offset().top - 200,
    speed: 500,
    easing: 'swing'
  });
  reloadImages();
  setTimeout(function() {
    autoCropHeight();
  }, 100);
}

function addProfileColor() {
  var color = payload.esColor;
  $('.colorStyle').remove();
  if (oddball.holiday) {
    clearInterval(animation);
    $(".profile_header_actions").css('right', '');
    $('.holidayprofile_header_overlay').remove();
    $("#profilebody").removeClass("holidayprofile");
    oddball.holiday = false;
  }
  $("#profilebody").removeClass("es_style_clear");
  $(".profile_header_bg_texture").css("background-image", "");
  $(".profile_customization").css("background-image", "");

  if (color === 0) {} else if (color == 4) {
    $("head").append("<link rel='stylesheet' type='text/css' href='https://steamcommunity-a.akamaihd.net/public/css/skin_1/holidayprofile.css'>");
    $(".profile_header_bg_texture").append("<div class='holidayprofile_header_overlay'></div>");
    $("#profilebody").addClass("holidayprofile");
    $(".profile_header_actions").css('right', '30px');
    $.getScript("https://steam.design/holiday.js").done(function() {
      StartAnimation();
      oddball.holiday = true;
    });
  } else if (color == 2) {
    $("#profilebody").addClass("es_style_clear");
  } else {
    $("head").append("<link rel='stylesheet' class='colorStyle' type='text/css' href='/images/profile_styles/" + color + "/style.css'>");
    $(".profile_header_bg_texture").css("background-image", "url('/images/profile_styles/" + color + "/header.jpg')");
    $(".profile_customization").css("background-image", "url('/images/profile_styles/" + color + "/showcase.png')");
  }
}

function esColorLoad(colorDiv) {
  payload.esColor = colorDiv.value;
}

function getTextWidth(text, font) {
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

function toggleCustomize() {
  getShareUrl(btoa(JSON.stringify(payload))).then(function(data) {
    var textWidth = getTextWidth('https://steam.design/s/' + data.ShortCode, "13px Arial");
    $('#shareWidth').css('width', Math.ceil(textWidth) + 5);
    $("#shareURL").val('https://steam.design/s/' + data.ShortCode);
  });

  $('#customize').toggle();
  $('#customizeBackground').fadeToggle();
  var hover = false;

  $('#customize').hover(function() {
    hover = true;
  }, function() {
    hover = false;
  });

  $('body').mouseup(function() {
    if (($('#customize').is(':visible')) && (!hover)) {
      closeCustomize();
    }
  });
}

function closeCustomize() {
  $('#customize').hide();
  $('#customizeBackground').fadeOut();
  addProfileColor();
  payloadHandler();
}

function closeCommunity() {
  $('#community_updates').hide();
  $('#customizeBackground').fadeOut();
  store.set('community', true);
}

function customizeCheckboxHandler(id) {
  var div = $('#' + id + '');
  var hiddenBelow = div.siblings('.hiddenBelow');

  switch (id) {
    case "SSSC_Checkbox":
      payload.toggles.SSSC_Enable = !payload.toggles.SSSC_Enable;
      if ($('#SSSC_Long_Checkbox').hasClass('checked')) {
        $('#SSSC_Long_Checkbox').trigger('click');
      }
      break;
    case "SSSC_Long_Checkbox":
      payload.toggles.SSSC_Long = !payload.toggles.SSSC_Long;
      if ($('#SSSC_Long_Minus70_Checkbox').hasClass('checked')) {
        $('#SSSC_Long_Minus70_Checkbox').trigger('click');
      }
      break;
    case "SSSC_Long_Minus70_Checkbox":
      payload.toggles.SSSC_Long_Minus70 = !payload.toggles.SSSC_Long_Minus70;
      break;
    case "AWSC_Checkbox":
      payload.toggles.AWSC_Enable = !payload.toggles.AWSC_Enable;
      if ($('#AWSC_Long_Checkbox').hasClass('checked')) {
        $('#AWSC_Long_Checkbox').trigger('click');
      }
      break;
    case "AWSC_Long_Checkbox":
      payload.toggles.AWSC_Long = !payload.toggles.AWSC_Long;
      if ($('#AWSC_Long_Minus70_Checkbox').hasClass('checked')) {
        $('#AWSC_Long_Minus70_Checkbox').trigger('click');
      }
      break;
    case "AWSC_Long_Minus70_Checkbox":
      payload.toggles.AWSC_Long_Minus70 = !payload.toggles.AWSC_Long_Minus70;
      break;
    case "WSSC_Checkbox":
      payload.toggles.WSSC_Enable = !payload.toggles.WSSC_Enable;
      break;
    default:
      console.log("How the hell?");
      break;
  }

  if (div.hasClass('checked')) {
    div.removeClass('checked');
  } else {
    div.addClass('checked');
  }
  if (hiddenBelow.length) {
    if (hiddenBelow.hasClass('hidden')) {
      hiddenBelow.removeClass('hidden');
    } else {
      hiddenBelow.addClass('hidden');
    }
  }
}

function shortenRight(showcase) {
  var bh = $('#big' + showcase + '').height();
  var uh = bh - 70;
  $('.r' + showcase + '').css('height', uh);
  $('.r' + showcase + '').addClass('shortened');
  $('.artwork_ammount_' + showcase + '').show();
}

function extendRight(showcase) {
  setTimeout(function() {
    var bh = $('#big' + showcase + '').height();
    $('.r' + showcase + '').css('height', bh);
    $('.r' + showcase + '').removeClass('shortened');
    $('.artwork_ammount_' + showcase + '').hide();
  }, 275);
}

function showDiv(showcase) {
  $('.showcase_' + showcase + '').removeClass('hidden');
}

function hideDiv(showcase) {
  $('.showcase_' + showcase + '').addClass('hidden');
}

function longImages(showcase) {
  var bh = $('#bgImgEl').height();
  var rOffset = $('#hBig' + showcase + '').offset().top - $('.profile_header').offset().top + 1;
  var autoHeight = bh - rOffset - 1;
  $('.hidelong' + showcase + '').addClass('hidden');
  $('.showlong' + showcase + '').removeClass('hidden');
  if (showcase == 1) {
    if (payload.toggles.AWSC_Resized) {
      return;
    }
  } else if (showcase == 2) {
    if (payload.toggles.SSSC_Resized) {
      return;
    }
  }
  $('#hBig' + showcase + '').css('height', autoHeight);
  $('.r' + showcase + '').css('height', autoHeight);
}

function autoCropHeight(showcase) {
  if (showcase == 1 && !payload.toggles.AWSC_Resized) {
    autoCropHeight_2(1);
    return;
  } else if (showcase == 2 && !payload.toggles.SSSC_Resized) {
    autoCropHeight_2(2);
    return;
  }

  if (payload.toggles.SSSC_Resized || payload.toggles.AWSC_Resized) {
    CropImages();
    return;
  }

  if (payload.toggles.SSSC_Long) {
    autoCropHeight_2(2);
  }
  if (payload.toggles.AWSC_Long) {
    autoCropHeight_2(1);
  }
}

function autoCropHeight_2(showcase) {
  var bh = $('#bgImgEl').height();
  var rOffset = $('#hBig' + showcase + '').offset().top - $('.profile_header').offset().top + 1;
  var autoHeight = bh - rOffset - 1;
  if (autoHeight < 284) {
    $('.r' + showcase + '').css('height', 284);
    $('#hBig' + showcase + '').css('height', 284);
    reloadImages();
    return;
  }
  $('.r' + showcase + '').css('height', autoHeight);
  $('#hBig' + showcase + '').css('height', autoHeight);
  reloadImages();
}

function shortImages(showcase) {
  $('#hBig' + showcase + '').css('height', 506);
  $('.hidelong' + showcase + '').removeClass('hidden');
  $('.r' + showcase + '').css('height', 80);
  $('.showlong' + showcase + '').addClass('hidden');
  $('.artwork_ammount_' + showcase + '').show();
}

function loadb64() {
  window.location.href = "#" + payload.background;
  loadb64Checkboxes();
  $('#colorChange').val(payload.esColor);
  addProfileColor();
  setTimeout(function() {
    if (payload.cropInfo.customHeight.AWSC) {
      loadCustomHeight(1, payload.cropInfo.customHeight.AWSC);
    }
    if (payload.cropInfo.customHeight.SSSC) {
      loadCustomHeight(2, payload.cropInfo.customHeight.SSSC);
    }
  }, 200);
}

function loadb64Checkboxes() {
  if (payload.toggles.SSSC_Enable) {
    loadb64Checkboxes_2($('#SSSC_Checkbox'));
  }
  if (payload.toggles.SSSC_Long) {
    loadb64Checkboxes_2($('#SSSC_Long_Checkbox'));
  }
  if (payload.toggles.SSSC_Long_Minus70) {
    loadb64Checkboxes_2($('#SSSC_Long_Minus70_Checkbox'));
  }
  if (!payload.toggles.AWSC_Enable) {
    loadb64Checkboxes_2($('#AWSC_Checkbox'));
  }
  if (!payload.toggles.AWSC_Long) {
    loadb64Checkboxes_2($('#AWSC_Long_Checkbox'));
  }
  if (payload.toggles.AWSC_Long_Minus70) {
    loadb64Checkboxes_2($('#AWSC_Long_Minus70_Checkbox'));
  }
  if (payload.WSSC_Enable) {
    loadb64Checkboxes_2($('#WSSC_Checkbox'));
  }
}

function loadb64Checkboxes_2(elem) {
  var hiddenBelow = elem.siblings('.hiddenBelow');
  if (elem.hasClass('checked')) {
    elem.removeClass('checked');
  } else {
    elem.addClass('checked');
  }
  if (hiddenBelow.length) {
    if (hiddenBelow.hasClass('hidden')) {
      hiddenBelow.removeClass('hidden');
    } else {
      hiddenBelow.addClass('hidden');
    }
  }
}

function payloadHandler() {
  if (payload.toggles.SSSC_Enable) {
    showDiv(2);
    if (payload.toggles.SSSC_Long) {
      longImages(2);
      if (payload.toggles.SSSC_Long_Minus70) {
        setTimeout(function() {
          shortenRight(2);
        }, 300);
      } else {
        extendRight(2);
      }
    } else {
      shortImages(2);
    }
  } else {
    hideDiv(2);
  }

  if (payload.toggles.AWSC_Enable) {
    showDiv(1);
    if (payload.toggles.AWSC_Long) {
      longImages(1);
      if (payload.toggles.AWSC_Long_Minus70) {
        shortenRight(1);
      } else {
        extendRight(1);
      }
    } else {
      shortImages(1);
    }
  } else {
    hideDiv(1);
  }

  if (payload.toggles.WSSC_Enable) {
    showDiv(3);
  } else {
    hideDiv(3);
  }
  reloadImages();
}

function loadCustomHeight(showcase, newHeight) {
  var bgHeight = $('#bgImgEl').height();
  var rightheight = newHeight - 70;
  if (showcase == 1) {
    $('.showcase_1').css('height', newHeight + 75);
    if (payload.toggles.AWSC_Long) {
      if (payload.toggles.AWSC_Long_Minus70 === true) {
        $('.r1').css('height', rightheight);
      } else {
        $('.r1').css('height', newHeight);
      }
    }

    if (newHeight >= 284 && newHeight <= bgHeight - 272) {
      $('#hBig1').css('height', newHeight + 'px');
    }
    payload.toggles.AWSC_Resized = true;
    $('#autoResize_AWSC').show();
    $('#autoResize_AWSC').click(function() {
      $('.showcase_1').css('height', '');
      autoCropHeight_2(1);
      $('#autoResize_AWSC').hide();
      closeCustomize();
    });
    if (payload.toggles.SSSC_Long) {
      autoCropHeight(2);
    }
  } else if (showcase == 2) {
    $('.showcase_2').css('height', newHeight + 75);
    if (payload.toggles.SSSC_Long) {
      if (payload.toggles.SSSC_Long_Minus70 === true) {
        $('.r2').css('height', rightheight);
      } else {
        $('.r2').css('height', newHeight);
      }
    }

    if (newHeight >= 284 && newHeight <= bgHeight - 272) {
      $('#hBig2').style.height = newHeight + 'px';
    }
    payload.toggles.SSSC_Resized = true;
    $('#autoResize_SSSC').show();
    $('#autoResize_SSSC').click(function() {
      $('.showcase_2').css('height', '');
      autoCropHeight_2(2);
      $('#autoResize_SSSC').hide();
      closeCustomize();
    });
    if (payload.toggles.AWSC_Long) {
      autoCropHeight(1);
    }
  }
}

$(function() {
  if (window.location.hostname == "sapic.github.io") {
    window.location = 'https://steam.design/' + location.hash;
  }

  if (!isNaN(version) && $('#cache_text_val').val() == version) {
    $('.cache_text').hide();
  }

  if (getParameterByName('base64') !== null) {
    payload = JSON.parse(atob(getParameterByName('base64')));
    store.set('shared', true);
    loadb64();
  }

  if (typeof shareinfo !== 'undefined') {
    payload = JSON.parse(atob(shareinfo));
    store.set('shared', true);
    loadb64();
  }

  $('#customizeButton').click(function() {
    toggleCustomize();
  });

  $('#customizeClose').click(function() {
    closeCustomize();
  });

  $('#community_close').click(function() {
    closeCommunity();
  });

  var hideangle = 0;
  var hide = store.get('hide');
  if (hide === true) {
    hideangle = 180;
    oddball.hideBacks = true;
    $('#hideBacksList').rotate({
      animateTo: 180
    });
  }

  $('#hideBacksList').click(function() {
    oddball.hideBacks = !oddball.hideBacks;
    store.set('hide', oddball.hideBacks);
    hideangle += 180;
    $('#backsList').toggleClass('backsListHide');
    $(this).rotate({
      animateTo: hideangle
    });
  });

  $('#refreshInventory').rotate({
    bind: {
      mouseover: function() {
        var angle = 0;
        oddball.refreshAngle = setInterval(function() {
          angle += 3;
          $("#refreshInventory").rotate(angle);
        }, 15);
      },
      click: function() {
        oddball.refresh = true;
        refreshInventory();
      },
      mouseout: function() {
        if (oddball.refresh !== true) {
          clearInterval(oddball.refreshAngle);
          $("#refreshInventory").rotate({
            animateTo: 0
          });
        }
      }
    }
  });

  var bgs = store.get('bgs');
  if (!bgs) {
    var expire = new Date().getTime() + 86400000;
    $.ajax('https://steam.design/bg.json').done(function(data) {
      store.set('bgs', data, expire);
      backgroundsList = data;
    });
  } else {
    backgroundsList = bgs;
  }

  addArrows();
  loginFunc();

  setTimeout(function() {
    if (typeof fuckAdBlock === 'undefined') {
      noAds();
    }
  }, 10);

  var userId = null;
  if (!window.localStorage) return;
  userId = window.localStorage.getItem('SteamId');
  if (userId !== null) {
    $('#steamAuth').append('<div class="fa fa-sign-out" style="display:inline;position:relative;cursor:pointer;top:2px;left:-10px;" title="Sign Out" href="#logout"></div>');
    createInventory(userId);
  } else {
    $('#steamAuth').append('<a href="https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=http%3A%2F%2Fsteam.design%2Findex.html%23login&openid.realm=http%3A%2F%2Fsteam.design&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select" class="name"><img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" width="129" height="25"></a>');
  }

  reloadImages();

  $(window).bind('hashchange', function() {
    loginFunc();
    //var val = $('input[type="radio"]:checked').val() == 'big' ? 1 : 0;
    reloadImages();
  });

  $('#filterIn').bind("change paste keyup", function() {
    $(".itemHolder:not(.arrow)").css('display', 'none');
    Enumerable.From($(".itemHolder:not(.arrow)")).Where(function(i) {
        return i.attributes('alt').value.indexOf($('#filterIn').val().toLowerCase()) != -1;
      })
      .Select().ToArray().forEach(function(elem) {
        $(elem).css('display', 'block');
      });
  });
  $('#goUrl').click(function() {
    var url = $("#urlIn").val();
    if (url.length > 0) {
      if (url.indexOf('http') == -1) {
        currentBGInfo = null;
        url = "https://" + url;
      }
    } else {
      url = randomBackground();
    }

    trackClick('goURLButton', url);
    window.location.href = "#" + url;
  });

  interact('.resizable-awsc')
    .resizable({
      axis: 'y',
    })
    .on('resizemove', function(event) {
      var target = event.target;
      // add the change in coords to the previous width of the target element
      var newHeight = parseFloat(target.style.height) + event.dy;
      var showcase = newHeight + 75;
      var bgHeight = $('#bgImgEl').height();

      $('#cSize').css('height', showcase);
      if (payload.toggles.AWSC_Long) {
        if (payload.toggles.AWSC_Long_Minus70 === true) {
          var rightheight = newHeight - 70;
          $('.r1').css('height', rightheight);
        } else {
          $('.r1').css('height', newHeight);
        }
      }

      if (newHeight >= 284 && newHeight <= bgHeight - 272) {
        target.style.height = newHeight + 'px';
      }

      payload.cropInfo.customHeight.AWSC = newHeight;
    })
    .on('resizeend', function() {
      payload.toggles.AWSC_Resized = true;
      $('#autoResize_AWSC').show();
      $('#autoResize_AWSC').click(function() {
        $('.showcase_1').css('height', '');
        autoCropHeight_2(1);
        $('#autoResize_AWSC').hide();
        closeCustomize();
      });
      if (payload.toggles.SSSC_Long) {
        autoCropHeight(2);
      } else {
        CropImages();
      }
    });
  interact('.resizable-sssc')
    .resizable({
      axis: 'y',
    })
    .on('resizemove', function(event) {
      var target = event.target;
      // add the change in coords to the previous width of the target element
      var newHeight = parseFloat(target.style.height) + event.dy;
      var showcase = newHeight + 75;
      var bgHeight = $('#bgImgEl').height();
      $('#sssc').css('height', showcase);
      if (payload.toggles.SSSC_Long) {
        if (payload.toggles.SSSC_Long_Minus70 === true) {
          var rightheight = newHeight - 70;
          $('.r2').css('height', rightheight);
        } else {
          $('.r2').css('height', newHeight);
        }
      }

      if (newHeight >= 284 && newHeight <= bgHeight - 272) {
        target.style.height = newHeight + 'px';
      }

      payload.cropInfo.customHeight.SSSC = newHeight;
    })
    .on('resizeend', function() {
      payload.toggles.SSSC_Resized = true;
      $('#autoResize_SSSC').show();
      $('#autoResize_SSSC').click(function() {
        $('.showcase_2').css('height', '');
        autoCropHeight_2(2);
        $('#autoResize_SSSC').hide();
        closeCustomize();
      });
      if (payload.toggles.AWSC_Long) {
        autoCropHeight(1);
      } else {
        CropImages();
      }
    });

  $("#slFSize").on("change", function() {
    $('#hBig1').css('height', this.value);
    reloadImages();
  });
  $("#slSSize").on("change", function() {
    $('#hBig2').css('height', this.value);
    reloadImages();
  });
  $("#randomBG").click(function() {
    trackClick('randomBGButton');
    window.location.href = "#" + randomBackground();
  });
  $("#getBg").click(function() {
    var _goUrl = currentBGInfo && currentBGInfo.url ?
      "https://steamcommunity.com/market/listings/" + currentBGInfo.url :
      'https://images.google.com/searchbyimage?image_url=' + background;

    trackClick('getBGButton', _goUrl);

    window.open(_goUrl, '_newtab');
  });
  $(".saveButton").click(function() {
    trackClick('getZIPButton', $(this).attr('href'));
  });
  $("#version").html("Version #" + version);
  $('#openCustomizeButton').click(function() {
    trackClick('openCustomizeButton');
  });

  var clipboard = new Clipboard('.copy-btn');

  clipboard.on('success', function(e) {
    var el = $("#copiedNotification");

    el.fadeIn("fast", function() {
      el.fadeOut("slow");
    });

    e.clearSelection();
  });
});

function trackClick(where, subject) {
  ga('send', {
    hitType: 'event',
    eventCategory: 'userClick',
    eventAction: where,
    eventLabel: subject || 'click'
  });
}

function getShareUrl(base64) {
  return new Promise(function(resolve, reject) {
    var shortCode = store.get('shortCode' + base64);

    if (shortCode) {
      console.log(shortCode);
      return resolve(shortCode);
    }

    $.ajax('https://steam.design/shorten/' + base64)
      .done(function(data) {
        store.set('shortCode' + base64, data.code);
        resolve(data.code);
      });
  });
}
