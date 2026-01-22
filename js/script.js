const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');

window.addEventListener('load', () => {
  // ローディング中（グレースクリーン）
  loadingAreaGrey.animate(
    {
      opacity: [1, 0],
      visibility: 'hidden',
    },
    {
      duration: 2000,
      delay: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );

  // ローディング中（薄緑スクリーン）
  loadingAreaGreen.animate(
    {
      translate: ['0 100vh', '0 0', '0 -100vh']
    },
    {
      duration: 2000,
      delay: 800,
      easing: 'ease',
      fill: 'forwards',
    }
  );  

  // ローディング中テキスト
  loadingText.animate(
    [
      {
        opacity: 1,
        offset: .8  //80%
      },
      {
        opacity: 0,
        offset: 1  //100%
      },
    ], 
    {
      duration: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );
  setTimeout(()=>{
    loadingAreaGrey.style.display = 'none';
  },2000 + 1200);
  setTimeout(() => {
  loadingAreaGreen.style.display = 'none';
}, 2000 + 800);

});

document.addEventListener('DOMContentLoaded', ()=>{
  //１）要素を取得
  const menuToggle =document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const menuClose = document.querySelector('.menu-close');
  const overlay = document.querySelector('.menu-overlay');

  //どれか無いと動かせないのでガード（AIさんさすがです。）
  if(!menuToggle||!nav||!menuClose||!overlay)return;

  //2)開く・閉じる関数
  function openMenu(){
    nav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded','true');

    //開いている間は三本線を隠して誤タップを防ぐ
    menuToggle.classList.add('is-hidden');

    //オーバーレイ表示
    overlay.hidden = false;

    //hidden解除直後だとtransitionが効きにくいので１フレーム遅らせる。
    requestAnimationFrame(() =>{
      overlay.classList.add('is-active');
    });

    //背景スクロールを止める
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(){
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.classList.remove('is-hidden');

    //オーバーレイをフェードアウト
    overlay.classList.remove('is-active');
    //transition時間（0.25秒）に合わせる
    setTimeout(() =>{
      overlay.hidden=true;
    },250);

    //スクロール解除
    document.body.style.overflow ='';
  }

  //3)クリックイベント
  menuToggle.addEventListener('click',() => {
    //すでに開いていたら閉じる、とじていたら開く
    const isOpen = nav.classList.contains('is-open');
    if(isOpen)closeMenu();
    else openMenu();
  });

  menuClose.addEventListener('click',closeMenu);

  //4)メニュー内のリンクを押したら閉じる
  nav.addEventListener('click',(e) =>{
    const clickedLink = e.target.closest('a');
    if(clickedLink)closeMenu();
  });

  //5)Escキーで閉じる
  document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape')closeMenu();
  });

  //6)背景タップで閉じる
  overlay.addEventListener('click',closeMenu);
});



