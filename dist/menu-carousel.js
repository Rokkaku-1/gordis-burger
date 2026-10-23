(() => {
 const track=document.querySelector('#products');
 const prev=document.querySelector('.carousel-prev');
 const next=document.querySelector('.carousel-next');
 const position=document.querySelector('.carousel-position');
 function update(){
  const cards=[...track.children];
  const end=Math.max(0,track.scrollWidth-track.clientWidth);
  prev.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=end-2;
  const first=cards.findIndex(card=>card.offsetLeft+card.offsetWidth>track.scrollLeft+4);
  const last=cards.reduce((n,card,i)=>card.offsetLeft<track.scrollLeft+track.clientWidth-4?i+1:n,0);
  position.textContent=cards.length?`${first+1}${last>first+1?'–'+last:''} de ${cards.length} productos`:'';
 }
 function advance(direction){
  const card=track.firstElementChild;if(!card)return;
  const step=card.offsetWidth+parseFloat(getComputedStyle(track).gap);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-off');
  track.scrollBy({left:direction*step,behavior:reduced?'instant':'smooth'});
 }
 prev.addEventListener('click',()=>advance(-1));next.addEventListener('click',()=>advance(1));
 track.addEventListener('scroll',update,{passive:true});
 track.addEventListener('keydown',event=>{if(event.target===track&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();advance(event.key==='ArrowRight'?1:-1);}});
 new MutationObserver(()=>{track.scrollLeft=0;update();}).observe(track,{childList:true});
 new ResizeObserver(update).observe(track);update();
})();
