
/*
 *	Fetch for files
 */
function fetchHTTP(url, methood){
	var request = new XMLHttpRequest(), response;

	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			response = request.responseText;
		}
	}
	request.open(methood ? methood : 'GET', url, false);
    request.overrideMimeType("text/plain");
	request.send(null);
	return response;
}

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}

function loadMarkdown(){

    // parse MARKDOWN
    //
	var mdFileURL = window.location.hash.substr(1);
	var mdText = "No **text** found";
	if(mdFileURL){
		mdText = fetchHTTP(mdFileURL);
	} else {
		mdText = fetchHTTP("README.md");
	}
	document.getElementById('content').innerHTML = marked(mdText);

    var sampleCodes = document.querySelectorAll(".live-coding");

    [].forEach.call(sampleCodes, function(sampleDiv) {
        var srcFile = sampleDiv.getAttribute('src');
        var p5 = document.createElement('p5-element');
        sampleDiv.appendChild(p5);
        var srcCode = fetchHTTP(srcFile);
        p5.setupFunction = srcCode;
        p5.drawFunction = '';
        p5.globalVars = '';

    });


    // parse CODE & CANVAS boxes
    /*
	var ccList = document.querySelectorAll(".codeAndCanvas");
    var id = "", 
        srcFile= "",
        str = ""
        imagesFiles = "",
        inject = "";

    var imgCounter = 0;
	for(var i = 0; i < ccList.length; i++){
		if (ccList[i].hasAttribute("data")){
			id = randomString(16, '#aA');
			srcFile = ccList[i].getAttribute("data");
            
            // load code
            str = fetchHTTP(srcFile);
            inject = '<div class="editor">\
            <canvas id ='+id+' class="canvas" data-fragment="'+str+'" ';

            // load images
            imagesFiles = ccList[i].getAttribute("data-imgs");
            imgCounter = 0;
            if ( imagesFiles ){
                var imgUrls = imagesFiles.split('&');
                for(var j in imgUrls){
                    var ext = imgUrls[j].substr(imgUrls[j].lastIndexOf('.') + 1);
                    if (ext == "png" || ext == "jpg" || ext == "PNG" || ext == "JPG" ){
                        if(imgCounter === 0){
                            inject += 'data-textures="'
                        } else {
                            inject += ",";
                        }
                        inject += imgUrls[j];
                        imgCounter++;
                    }
                }
                if (imgCounter !== 0){
                    inject += '" ';
                }
            } 
            inject += ' width="250px" height="250px"></canvas>\
			</div>';

            // inject the code
            ccList[i].innerHTML = inject;

            // wakeup the code editor
			var demoEditor = ccList[i].getElementsByTagName("div");
			if(demoEditor[0]){
				var editor = CodeMirror(demoEditor[0],{
					value: str,
					viewportMargin: Infinity,
					lineNumbers: true,
					matchBrackets: true,
					mode: "x-shader/x-fragment",
					keyMap: "sublime",
					autoCloseBrackets: true,
					extraKeys: {"Ctrl-Space": "autocomplete"},
					showCursorWhenSelecting: true,
                    lineWrapping: true,
                    indentUnit: 4
				});

				editor.id = id;

                editor.on("cursorActivity", function(cm) {
                    var canvasToChange = document.getElementById(cm.id);
                    var height = cm.heightAtLine(cm.getCursor().line+1,'local')-canvasToChange.height;
                    if (height<0){
                        height = 0.0;   
                    }
                    canvasToChange.style.top = (height).toString()+"px";
                });

				editor.on("change", function(cm, change) {
					var canvasToChange = document.getElementById(cm.id);
					canvasToChange.setAttribute("data-fragment", cm.getValue());
					loadShaders();
				});
			}
		}
	}

    // parse Simple FUNCTIONS
    var fList = document.querySelectorAll(".simpleFunction");
    for(var i = 0; i < fList.length; i++){
        if (fList[i].hasAttribute("data")){
            id = randomString(16, '#aA');
            var funct = fList[i].getAttribute("data");
  
            // compose glslCanvas
            fList[i].innerHTML = '<div class="function">\
            <canvas id ='+id+' class="canvas" data-fragment="'+preFunction+funct+postFunction+'" width="800px" height="240px" ></canvas>\
            </div>\
            <p class="caption">Graph plotter by <a href="http://blog.hvidtfeldts.net/index.php/2011/07/plotting-high-frequency-functions-using-a-gpu/">Mikael Hvidtfeldt Christensen</a> (2011)<p>';

            // wakeup the code editor
            var demoEditor = fList[i].getElementsByTagName("div");
            if(demoEditor[0]){
                var editor = CodeMirror(demoEditor[0],{
                    value: funct,
                    viewportMargin: Infinity,
                    lineNumbers: false,
                    matchBrackets: true,
                    mode: "x-shader/x-fragment",
                    keyMap: "sublime",
                    autoCloseBrackets: true,
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    showCursorWhenSelecting: true,
                    indentUnit: 4
                });
                editor.id = id;

                editor.on("change", function(cm, change) {
                    var canvasToChange = document.getElementById(cm.id);
                    canvasToChange.setAttribute("data-fragment", preFunction+cm.getValue()+postFunction);
                    loadShaders();
                });
            }
        }
    }

    */

	// Load codes tags that have "src" attributes
	var list = document.getElementsByTagName("code");
	for(var i = 0; i < list.length; i++){
		if (list[i].className == "lang-glsl" || 
			list[i].className == "lang-bash" || 
			list[i].className == "lang-cpp" || 
			list[i].className == "lang-html" ||
            list[i].className == "lang-processing" ){
			hljs.highlightBlock(list[i]);
		}
	}
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function captionizeImages() {
    if (!document.getElementsByTagName) 
        return false;

    if (!document.createElement) 
        return false;
    
    var images = document.getElementsByTagName("img");
    if (images.length < 1) 
        return false; 

    for (var i=0; i<images.length; i++) {
        var title = images[i].getAttribute("alt");

        if (title != ""){
            var divCaption = document.createElement("div");
            divCaption.className = "caption";
            var divCaption_text = document.createTextNode(title);
            divCaption.appendChild(divCaption_text);
            var divContainer = document.createElement("div");
            divContainer.className="imgcontainer";
            images[i].parentNode.insertBefore(divContainer,images[i]);
            divContainer.appendChild(images[i]);
            insertAfter(divCaption,images[i]);
        }
    }
}

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function checkUrl(url) {
    var request = false;
    if (window.XMLHttpRequest) {
            request = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
            request = new ActiveXObject("Microsoft.XMLHttp");
    }

    if (request) {
            request.open("GET", url);
            if (request.status == 200) { return true; }
    }

    return false;
}

function previusPage(){
	var path = window.location.pathname;
	var n = parseInt( path.match( /[0-1].(?!.*[0-1])/ )[0] );
    var url;
	n -= 1;
    if(n < 0){
        url = "../";
    } else {
        url = "../" + FormatNumberLength(n,2);
    }
	window.location.href =  url;
}

function homePage(){
	window.location.href = "../";
}

function nextPage(){
	var path = window.location.pathname;
	var n = parseInt( path.match( /[0-1].(?!.*[0-1])/ )[0] );
	n += 1;
	var url = "../" + FormatNumberLength(n,2);
	window.location.href =  url;
}

window.onload = function(){
	loadMarkdown();
    captionizeImages();

	//loadShaders();
	//renderShaders(); 
};