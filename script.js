const clock=document.querySelector('#clock');
const tick=()=>{if(clock)clock.textContent=new Intl.DateTimeFormat('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())};tick();setInterval(tick,30000);

document.querySelectorAll('[data-dismiss]').forEach(button=>button.addEventListener('click',()=>button.closest('.float-note')?.remove()));

// Project notes open in-place so the work index stays scannable.
document.querySelectorAll('.work-card details').forEach(details=>details.addEventListener('toggle',()=>{
 if(details.open)document.querySelectorAll('.work-card details').forEach(other=>{if(other!==details)other.open=false});
}));

// Keep the compact navigation usable on touch devices and indicate the current section.
const navLinks=[...document.querySelectorAll('.taskbar nav a')];
const sections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('current',link.hash===`#${entry.target.id}`))}
 }),{rootMargin:'-30% 0px -60% 0px'});
 sections.forEach(section=>observer.observe(section));
}
