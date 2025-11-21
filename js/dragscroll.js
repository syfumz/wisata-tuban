(function () {
  var wrapper = document.getElementById("wrapper");
  var view = document.querySelector(".view-content");
  if (!wrapper || !view) return;

  var viewW = view.offsetWidth;
  var viewH = view.offsetHeight;

  var isDown = false;
  var startX = 0, startY = 0;
  var scrollLeft = 0, scrollTop = 0;

  var scale = 1;
  var minScale = 1;
  var maxScale = 3;

  function computeFitScale(){
    return Math.max(wrapper.clientWidth / viewW, wrapper.clientHeight / viewH);
  }

  function applyScale(s){
    view.style.transform = "scale(" + s + ")";
  }

  function init(){
    var fit = computeFitScale();
    minScale = scale = fit;
    applyScale(scale);

    view.style.visibility = "visible";

    var fullW = viewW * scale;
    var fullH = viewH * scale;

    wrapper.scrollLeft = (fullW - wrapper.clientWidth)/2;
    wrapper.scrollTop  = (fullH - wrapper.clientHeight)/2;
  }

  window.addEventListener("load", init);
  window.addEventListener("resize", init);

  wrapper.addEventListener("mousedown", function(e){
    isDown = true;
    wrapper.classList.add("dragging");
    startX = e.pageX;
    startY = e.pageY;
    scrollLeft = wrapper.scrollLeft;
    scrollTop  = wrapper.scrollTop;
  });

  document.addEventListener("mouseup", function(){
    isDown = false;
    wrapper.classList.remove("dragging");
  });

  wrapper.addEventListener("mousemove", function(e){
    if(!isDown) return;
    wrapper.scrollLeft = scrollLeft - (e.pageX - startX);
    wrapper.scrollTop  = scrollTop - (e.pageY - startY);
  });

  wrapper.addEventListener("wheel", function(e){
    e.preventDefault();

    var rect = view.getBoundingClientRect();
    var offsetX = (e.clientX - rect.left) / scale;
    var offsetY = (e.clientY - rect.top) / scale;

    var prevScale = scale;
    scale *= (e.deltaY < 0 ? 1.12 : 0.88);
    scale = Math.max(minScale, Math.min(maxScale, scale));

    applyScale(scale);

    wrapper.scrollLeft = offsetX * scale - (e.clientX - wrapper.getBoundingClientRect().left);
    wrapper.scrollTop  = offsetY * scale - (e.clientY - wrapper.getBoundingClientRect().top);

  }, { passive:false });

})();

function applyZoom() {
    mapWrapper.style.transform = `scale(${currentZoom})`;

    document.querySelectorAll('.pin').forEach(pin => {
        pin.style.transform = `scale(${1 / currentZoom})`;
    });
}
