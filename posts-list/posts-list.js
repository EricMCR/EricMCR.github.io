function onload2(){
	$("#right p").html(getCategory());
	SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '/assets/search.json',
  searchResultTemplate: '<li><a href="{{ site.url }}{url}">{title}</a></li>'
})
}

function getCategory(){
  var url = document.location.toString();//获取url地址
  var urlParmStr = url.slice(url.indexOf('?')+1);//获取问号后所有的字符串
  return urlParmStr;
}