const showSolution = () => {
	const x = document.getElementById('case-solution')
	const y = document.getElementById('solution-box')
	const z = document.getElementById('ssb1')
	const a = document.getElementById('solution-recommended')
	if (x.style.display === 'none') {
		x.style.display = 'block'
		y.style.display = 'block'
		a.style.display = 'block'
		z.innerHTML = 'Musterlösung zuklappen'
		z.style.color = '#cca768'
		z.style.backgroundColor = 'white'
		z.style.border = '1px solid #cca768'
		window.scrollBy(0, 500)
	} else {
		x.style.display = 'none'
		y.style.display = 'none'
		a.style.display = 'none'
		z.innerHTML = 'Musterlösung anzeigen'
		z.style.color = 'white'
		z.style.backgroundColor = '#cca768'
		z.style.border = 'none'
	}
}


const openLawTab = () => {
	let tab1, tab2, tab3, sub1, sub2, sub3
	tab1 = document.getElementById('civillaw')
	tab2 = document.getElementById('criminallaw')
	tab3 = document.getElementById('publiclaw')
	sub1 = document.getElementById('zivilrecht-radio')
	sub2 = document.getElementById('strafrecht-radio')
	sub3 = document.getElementById('oefrecht-radio')
	switch (true) {
		case tab1.checked:
			sub1.style.display = 'flex'
			sub2.style.display = 'none'
			sub3.style.display = 'none'
			break
		case tab2.checked:
			sub1.style.display = 'none'
			sub2.style.display = 'flex'
			sub3.style.display = 'none'
			break
		case tab3.checked:
			sub1.style.display = 'none'
			sub2.style.display = 'none'
			sub3.style.display = 'flex'
			break
		default:
			sub1.style.display = 'flex'
			sub2.style.display = 'none'
			sub3.style.display = 'none'
	}
}


const uploadTabs = (evt, cityName) => {
	let i, tabcontent, tablinks
	tabcontent = document.getElementsByClassName('tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	tablinks = document.getElementsByClassName('tablinks')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}
	document.getElementById(cityName).style.display = 'block'
	evt.currentTarget.className += ' active'
}

const cbChecked = () => {
	const cb = document.getElementById('selfWriteConfirm')
	const btn = document.getElementById('publish-upload')
	if (cb.checked) {
		btn.style.backgroundColor = '#cca768'
		btn.disabled = false
		btn.style.cursor = 'pointer'
	} else {
		btn.style.backgroundColor = 'var(--juriverse-grey)'
	}
}

/* NicEdit - Micro Inline WYSIWYG
 * Copyright 2007-2008 Brian Kirchoff
 *
 * NicEdit is distributed under the terms of the MIT license
 * For more information visit http://nicedit.com/
 * Do not remove this copyright message
 */
var bkExtend = function () { var A = arguments; if (A.length == 1) { A = [this, A[0]] } for (var B in A[1]) { A[0][B] = A[1][B] } return A[0] }; function bkClass() { } bkClass.prototype.construct = function () { }; bkClass.extend = function (C) { var A = function () { if (arguments[0] !== bkClass) { return this.construct.apply(this, arguments) } }; var B = new this(bkClass); bkExtend(B, C); A.prototype = B; A.extend = this.extend; return A }; var bkElement = bkClass.extend({ construct: function (B, A) { if (typeof (B) == "string") { B = (A || document).createElement(B) } B = $BK(B); return B }, appendTo: function (A) { A.appendChild(this); return this }, appendBefore: function (A) { A.parentNode.insertBefore(this, A); return this }, addEvent: function (B, A) { bkLib.addEvent(this, B, A); return this }, setContent: function (A) { this.innerHTML = A; return this }, pos: function () { var C = curtop = 0; var B = obj = this; if (obj.offsetParent) { do { C += obj.offsetLeft; curtop += obj.offsetTop } while (obj = obj.offsetParent) } var A = (!window.opera) ? parseInt(this.getStyle("border-width") || this.style.border) || 0 : 0; return [C + A, curtop + A + this.offsetHeight] }, noSelect: function () { bkLib.noSelect(this); return this }, parentTag: function (A) { var B = this; do { if (B && B.nodeName && B.nodeName.toUpperCase() == A) { return B } B = B.parentNode } while (B); return false }, hasClass: function (A) { return this.className.match(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)")) }, addClass: function (A) { if (!this.hasClass(A)) { this.className += " nicEdit-" + A } return this }, removeClass: function (A) { if (this.hasClass(A)) { this.className = this.className.replace(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"), " ") } return this }, setStyle: function (A) { var B = this.style; for (var C in A) { switch (C) { case "float": B.cssFloat = B.styleFloat = A[C]; break; case "opacity": B.opacity = A[C]; B.filter = "alpha(opacity=" + Math.round(A[C] * 100) + ")"; break; case "className": this.className = A[C]; break; default: B[C] = A[C] } } return this }, getStyle: function (A, C) { var B = (!C) ? document.defaultView : C; if (this.nodeType == 1) { return (B && B.getComputedStyle) ? B.getComputedStyle(this, null).getPropertyValue(A) : this.currentStyle[bkLib.camelize(A)] } }, remove: function () { this.parentNode.removeChild(this); return this }, setAttributes: function (A) { for (var B in A) { this[B] = A[B] } return this } }); var bkLib = { isMSIE: (navigator.appVersion.indexOf("MSIE") != -1), addEvent: function (C, B, A) { (C.addEventListener) ? C.addEventListener(B, A, false) : C.attachEvent("on" + B, A) }, toArray: function (C) { var B = C.length, A = new Array(B); while (B--) { A[B] = C[B] } return A }, noSelect: function (B) { if (B.setAttribute && B.nodeName.toLowerCase() != "input" && B.nodeName.toLowerCase() != "textarea") { B.setAttribute("unselectable", "on") } for (var A = 0; A < B.childNodes.length; A++) { bkLib.noSelect(B.childNodes[A]) } }, camelize: function (A) { return A.replace(/\-(.)/g, function (B, C) { return C.toUpperCase() }) }, inArray: function (A, B) { return (bkLib.search(A, B) != null) }, search: function (A, C) { for (var B = 0; B < A.length; B++) { if (A[B] == C) { return B } } return null }, cancelEvent: function (A) { A = A || window.event; if (A.preventDefault && A.stopPropagation) { A.preventDefault(); A.stopPropagation() } return false }, domLoad: [], domLoaded: function () { if (arguments.callee.done) { return } arguments.callee.done = true; for (i = 0; i < bkLib.domLoad.length; i++) { bkLib.domLoad[i]() } }, onDomLoaded: function (A) { this.domLoad.push(A); if (document.addEventListener) { document.addEventListener("DOMContentLoaded", bkLib.domLoaded, null) } else { if (bkLib.isMSIE) { document.write("<style>.nicEdit-main p { margin: 0; }</style><script id=__ie_onload defer " + ((location.protocol == "https:") ? "src='javascript:void(0)'" : "src=//0") + "><\/script>"); $BK("__ie_onload").onreadystatechange = function () { if (this.readyState == "complete") { bkLib.domLoaded() } } } } window.onload = bkLib.domLoaded } }; function $BK(A) { if (typeof (A) == "string") { A = document.getElementById(A) } return (A && !A.appendTo) ? bkExtend(A, bkElement.prototype) : A } var bkEvent = { addEvent: function (A, B) { if (B) { this.eventList = this.eventList || {}; this.eventList[A] = this.eventList[A] || []; this.eventList[A].push(B) } return this }, fireEvent: function () { var A = bkLib.toArray(arguments), C = A.shift(); if (this.eventList && this.eventList[C]) { for (var B = 0; B < this.eventList[C].length; B++) { this.eventList[C][B].apply(this, A) } } } }; function __(A) { return A } Function.prototype.closure = function () { var A = this, B = bkLib.toArray(arguments), C = B.shift(); return function () { if (typeof (bkLib) != "undefined") { return A.apply(C, B.concat(bkLib.toArray(arguments))) } } }; Function.prototype.closureListener = function () { var A = this, C = bkLib.toArray(arguments), B = C.shift(); return function (E) { E = E || window.event; if (E.target) { var D = E.target } else { var D = E.srcElement } return A.apply(B, [E, D].concat(C)) } };



var nicEditorConfig = bkClass.extend({
	buttons: {
		bold: {
			name: __('Click to Bold'),
			command: 'Bold',
			tags: ['B', 'STRONG'],
			css: { 'font-weight': 'bold' },
			key: 'b',
		},
		italic: {
			name: __('Click to Italic'),
			command: 'Italic',
			tags: ['EM', 'I'],
			css: { 'font-style': 'italic' },
			key: 'i',
		},
		underline: {
			name: __('Click to Underline'),
			command: 'Underline',
			tags: ['U'],
			css: { 'text-decoration': 'underline' },
			key: 'u',
		},
		left: { name: __('Left Align'), command: 'justifyleft', noActive: true },
		center: { name: __('Center Align'), command: 'justifycenter', noActive: true },
		right: { name: __('Right Align'), command: 'justifyright', noActive: true },
		justify: { name: __('Justify Align'), command: 'justifyfull', noActive: true },
		ol: { name: __('Insert Ordered List'), command: 'insertorderedlist', tags: ['OL'] },
		ul: { name: __('Insert Unordered List'), command: 'insertunorderedlist', tags: ['UL'] },
		subscript: { name: __('Click to Subscript'), command: 'subscript', tags: ['SUB'] },
		superscript: { name: __('Click to Superscript'), command: 'superscript', tags: ['SUP'] },
		strikethrough: {
			name: __('Click to Strike Through'),
			command: 'strikeThrough',
			css: { 'text-decoration': 'line-through' },
		},
		removeformat: { name: __('Remove Formatting'), command: 'removeformat', noActive: true },
		indent: { name: __('Indent Text'), command: 'indent', noActive: true },
		outdent: { name: __('Remove Indent'), command: 'outdent', noActive: true },
		hr: { name: __('Horizontal Rule'), command: 'insertHorizontalRule', noActive: true },
	},
	iconsPath: '/images/nicEditorIcons.gif',
	buttonList: [
		'save',
		'bold',
		'italic',
		'underline',
		'left',
		'center',
		'right',
		'justify',
		'ol',
		'ul',
		'fontFormat',
		'indent',
		'outdent',
		'upload',
		'subscript',
		'superscript',
	],
	iconList: {
		bgcolor: 0,
		forecolor:0,
		bold: 3,
		center: 4,
		hr: 5,
		indent: 6,
		italic: 7,
		justify: 8,
		left: 9,
		ol: 10,
		outdent: 11,
		removeformat: 12,
		right: 13,
		save: 24,
		strikethrough: 15,
		subscript: 16,
		superscript: 17,
		ul: 18,
		underline: 19,
		image: 20,
		link: 21,
		unlink: 22,
		close: 23,
		arrow: 25,
	},
})
;
var nicEditors = { nicPlugins: [], editors: [], registerPlugin: function (B, A) { this.nicPlugins.push({ p: B, o: A }) }, allTextAreas: function (C) { var A = document.getElementsByTagName("textarea"); for (var B = 0; B < A.length; B++) { nicEditors.editors.push(new nicEditor(C).panelInstance(A[B])) } return nicEditors.editors }, findEditor: function (C) { var B = nicEditors.editors; for (var A = 0; A < B.length; A++) { if (B[A].instanceById(C)) { return B[A].instanceById(C) } } } }; var nicEditor = bkClass.extend({ construct: function (C) { this.options = new nicEditorConfig(); bkExtend(this.options, C); this.nicInstances = new Array(); this.loadedPlugins = new Array(); var A = nicEditors.nicPlugins; for (var B = 0; B < A.length; B++) { this.loadedPlugins.push(new A[B].p(this, A[B].o)) } nicEditors.editors.push(this); bkLib.addEvent(document.body, "mousedown", this.selectCheck.closureListener(this)) }, panelInstance: function (B, C) { B = this.checkReplace($BK(B)); var A = new bkElement("DIV").setStyle({ width: (parseInt(B.getStyle("width")) || B.clientWidth) + "px" }).appendBefore(B); this.setPanel(A); return this.addInstance(B, C) }, checkReplace: function (B) { var A = nicEditors.findEditor(B); if (A) { A.removeInstance(B); A.removePanel() } return B }, addInstance: function (B, C) { B = this.checkReplace($BK(B)); if (B.contentEditable || !!window.opera) { var A = new nicEditorInstance(B, C, this) } else { var A = new nicEditorIFrameInstance(B, C, this) } this.nicInstances.push(A); return this }, removeInstance: function (C) { C = $BK(C); var B = this.nicInstances; for (var A = 0; A < B.length; A++) { if (B[A].e == C) { B[A].remove(); this.nicInstances.splice(A, 1) } } }, removePanel: function (A) { if (this.nicPanel) { this.nicPanel.remove(); this.nicPanel = null } }, instanceById: function (C) { C = $BK(C); var B = this.nicInstances; for (var A = 0; A < B.length; A++) { if (B[A].e == C) { return B[A] } } }, setPanel: function (A) { this.nicPanel = new nicEditorPanel($BK(A), this.options, this); this.fireEvent("panel", this.nicPanel); return this }, nicCommand: function (B, A) { if (this.selectedInstance) { this.selectedInstance.nicCommand(B, A) } }, getIcon: function (D, A) { var C = this.options.iconList[D]; var B = (A.iconFiles) ? A.iconFiles[D] : ""; return { backgroundImage: "url('" + ((C) ? this.options.iconsPath : B) + "')", backgroundPosition: ((C) ? ((C - 1) * -18) : 0) + "px 0px" } }, selectCheck: function (C, A) { var B = false; do { if (A.className && A.className.indexOf("nicEdit") != -1) { return false } } while (A = A.parentNode); this.fireEvent("blur", this.selectedInstance, A); this.lastSelectedInstance = this.selectedInstance; this.selectedInstance = null; return false } }); nicEditor = nicEditor.extend(bkEvent);
var nicEditorInstance = bkClass.extend({ isSelected: false, construct: function (G, D, C) { this.ne = C; this.elm = this.e = G; this.options = D || {}; newX = parseInt(G.getStyle("width")) || G.clientWidth; newY = parseInt(G.getStyle("height")) || G.clientHeight; this.initialHeight = newY - 8; var H = (G.nodeName.toLowerCase() == "textarea"); if (H || this.options.hasPanel) { var B = (bkLib.isMSIE && !((typeof document.body.style.maxHeight != "undefined") && document.compatMode == "CSS1Compat")); var E = { width: newX + "px"/*, border: "1px solid #ccc"*/, borderTop: 0, overflowY: "auto", overflowX: "hidden" }; E[(B) ? "height" : "maxHeight"] = (this.ne.options.maxHeight) ? this.ne.options.maxHeight + "px" : null; this.editorContain = new bkElement("DIV").setStyle(E).appendBefore(G); var A = new bkElement("DIV").setStyle({ width: (newX - 8) + "px", margin: "4px", minHeight: newY + "px" }).addClass("main").appendTo(this.editorContain); G.setStyle({ display: "none" }); A.innerHTML = G.innerHTML; if (H) { A.setContent(G.value); this.copyElm = G; var F = G.parentTag("FORM"); if (F) { bkLib.addEvent(F, "submit", this.saveContent.closure(this)) } } A.setStyle((B) ? { height: newY + "px" } : { overflow: "hidden" }); this.elm = A } this.ne.addEvent("blur", this.blur.closure(this)); this.init(); this.blur() }, init: function () { this.elm.setAttribute("contentEditable", "true"); if (this.getContent() == "") { this.setContent("<br />") } this.instanceDoc = document.defaultView; this.elm.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keypress", this.keyDown.closureListener(this)).addEvent("focus", this.selected.closure(this)).addEvent("blur", this.blur.closure(this)).addEvent("keyup", this.selected.closure(this)); this.ne.fireEvent("add", this) }, remove: function () { this.saveContent(); if (this.copyElm || this.options.hasPanel) { this.editorContain.remove(); this.e.setStyle({ display: "block" }); this.ne.removePanel() } this.disable(); this.ne.fireEvent("remove", this) }, disable: function () { this.elm.setAttribute("contentEditable", "false") }, getSel: function () { return (window.getSelection) ? window.getSelection() : document.selection }, getRng: function () { var A = this.getSel(); if (!A || A.rangeCount === 0) { return } return (A.rangeCount > 0) ? A.getRangeAt(0) : A.createRange() }, selRng: function (A, B) { if (window.getSelection) { B.removeAllRanges(); B.addRange(A) } else { A.select() } }, selElm: function () { var C = this.getRng(); if (!C) { return } if (C.startContainer) { var D = C.startContainer; if (C.cloneContents().childNodes.length == 1) { for (var B = 0; B < D.childNodes.length; B++) { var A = D.childNodes[B].ownerDocument.createRange(); A.selectNode(D.childNodes[B]); if (C.compareBoundaryPoints(Range.START_TO_START, A) != 1 && C.compareBoundaryPoints(Range.END_TO_END, A) != -1) { return $BK(D.childNodes[B]) } } } return $BK(D) } else { return $BK((this.getSel().type == "Control") ? C.item(0) : C.parentElement()) } }, saveRng: function () { this.savedRange = this.getRng(); this.savedSel = this.getSel() }, restoreRng: function () { if (this.savedRange) { this.selRng(this.savedRange, this.savedSel) } }, keyDown: function (B, A) { if (B.ctrlKey) { this.ne.fireEvent("key", this, B) } }, selected: function (C, A) { if (!A && !(A = this.selElm)) { A = this.selElm() } if (!C.ctrlKey) { var B = this.ne.selectedInstance; if (B != this) { if (B) { this.ne.fireEvent("blur", B, A) } this.ne.selectedInstance = this; this.ne.fireEvent("focus", B, A) } this.ne.fireEvent("selected", B, A); this.isFocused = true; this.elm.addClass("selected") } return false }, blur: function () { this.isFocused = false; this.elm.removeClass("selected") }, saveContent: function () { if (this.copyElm || this.options.hasPanel) { this.ne.fireEvent("save", this); (this.copyElm) ? this.copyElm.value = this.getContent() : this.e.innerHTML = this.getContent() } }, getElm: function () { return this.elm }, getContent: function () { this.content = this.getElm().innerHTML; this.ne.fireEvent("get", this); return this.content }, setContent: function (A) { this.content = A; this.ne.fireEvent("set", this); this.elm.innerHTML = this.content }, nicCommand: function (B, A) { document.execCommand(B, false, A) } });
var nicEditorIFrameInstance = nicEditorInstance.extend({ savedStyles: [], init: function () { var B = this.elm.innerHTML.replace(/^\s+|\s+$/g, ""); this.elm.innerHTML = ""; (!B) ? B = "<br />" : B; this.initialContent = B; this.elmFrame = new bkElement("iframe").setAttributes({ src: "javascript:;", frameBorder: 0, allowTransparency: "true", scrolling: "no" }).setStyle({ height: "100px", width: "100%" }).addClass("frame").appendTo(this.elm); if (this.copyElm) { this.elmFrame.setStyle({ width: (this.elm.offsetWidth - 4) + "px" }) } var A = ["font-size", "font-family", "font-weight", "color"]; for (itm in A) { this.savedStyles[bkLib.camelize(itm)] = this.elm.getStyle(itm) } setTimeout(this.initFrame.closure(this), 50) }, disable: function () { this.elm.innerHTML = this.getContent() }, initFrame: function () { var B = $BK(this.elmFrame.contentWindow.document); B.designMode = "on"; B.open(); var A = this.ne.options.externalCSS; B.write("<html><head>" + ((A) ? '<link href="' + A + '" rel="stylesheet" type="text/css" />' : "") + '</head><body id="nicEditContent" style="margin: 0 !important; background-color: transparent !important;">' + this.initialContent + "</body></html>"); B.close(); this.frameDoc = B; this.frameWin = $BK(this.elmFrame.contentWindow); this.frameContent = $BK(this.frameWin.document.body).setStyle(this.savedStyles); this.instanceDoc = this.frameWin.document.defaultView; this.heightUpdate(); this.frameDoc.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keyup", this.heightUpdate.closureListener(this)).addEvent("keydown", this.keyDown.closureListener(this)).addEvent("keyup", this.selected.closure(this)); this.ne.fireEvent("add", this) }, getElm: function () { return this.frameContent }, setContent: function (A) { this.content = A; this.ne.fireEvent("set", this); this.frameContent.innerHTML = this.content; this.heightUpdate() }, getSel: function () { return (this.frameWin) ? this.frameWin.getSelection() : this.frameDoc.selection }, heightUpdate: function () { this.elmFrame.style.height = Math.max(this.frameContent.offsetHeight, this.initialHeight) + "px" }, nicCommand: function (B, A) { this.frameDoc.execCommand(B, false, A); setTimeout(this.heightUpdate.closure(this), 100) } });
var nicEditorPanel = bkClass.extend({ construct: function (E, B, A) { this.elm = E; this.options = B; this.ne = A; this.panelButtons = new Array(); this.buttonList = bkExtend([], this.ne.options.buttonList); this.panelContain = new bkElement("DIV").setStyle({ overflow: "hidden", width: "100%" /*,border: "1px solid #cccccc", backgroundColor: "#efefef"*/ }).addClass("panelContain"); this.panelElm = new bkElement("DIV").setStyle({ margin: "2px", marginTop: "0px", zoom: 1, overflow: "hidden" }).addClass("panel").appendTo(this.panelContain); this.panelContain.appendTo(E); var C = this.ne.options; var D = C.buttons; for (button in D) { this.addButton(button, C, true) } this.reorder(); E.noSelect() }, addButton: function (buttonName, options, noOrder) { var button = options.buttons[buttonName]; var type = (button.type) ? eval("(typeof(" + button.type + ') == "undefined") ? null : ' + button.type + ";") : nicEditorButton; var hasButton = bkLib.inArray(this.buttonList, buttonName); if (type && (hasButton || this.ne.options.fullPanel)) { this.panelButtons.push(new type(this.panelElm, buttonName, options, this.ne)); if (!hasButton) { this.buttonList.push(buttonName) } } }, findButton: function (B) { for (var A = 0; A < this.panelButtons.length; A++) { if (this.panelButtons[A].name == B) { return this.panelButtons[A] } } }, reorder: function () { var C = this.buttonList; for (var B = 0; B < C.length; B++) { var A = this.findButton(C[B]); if (A) { this.panelElm.appendChild(A.margin) } } }, remove: function () { this.elm.remove() } });
var nicEditorButton = bkClass.extend({ construct: function (D, A, C, B) { this.options = C.buttons[A]; this.name = A; this.ne = B; this.elm = D; this.margin = new bkElement("DIV").setStyle({ "float": "left", marginTop: "2px" }).appendTo(D); this.contain = new bkElement("DIV").setStyle({ width: "20px", height: "20px" }).addClass("buttonContain").appendTo(this.margin); this.border = new bkElement("DIV").setStyle({ backgroundColor: "#efefef", border: "1px solid #efefef" }).appendTo(this.contain); this.button = new bkElement("DIV").setStyle({ width: "18px", height: "18px", overflow: "hidden", zoom: 1, cursor: "pointer" }).addClass("button").setStyle(this.ne.getIcon(A, C)).appendTo(this.border); this.button.addEvent("mouseover", this.hoverOn.closure(this)).addEvent("mouseout", this.hoverOff.closure(this)).addEvent("mousedown", this.mouseClick.closure(this)).noSelect(); if (!window.opera) { this.button.onmousedown = this.button.onclick = bkLib.cancelEvent } B.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this)).addEvent("key", this.key.closure(this)); this.disable(); this.init() }, init: function () { }, hide: function () { this.contain.setStyle({ display: "none" }) }, updateState: function () { if (this.isDisabled) { this.setBg() } else { if (this.isHover) { this.setBg("hover") } else { if (this.isActive) { this.setBg("active") } else { this.setBg() } } } }, setBg: function (A) { switch (A) { case "hover": var B = { border: "1px solid #666", backgroundColor: "#ddd" }; break; case "active": var B = { border: "1px solid #666", backgroundColor: "#ccc" }; break; default: var B = { border: "1px solid #efefef", backgroundColor: "#efefef" } }this.border.setStyle(B).addClass("button-" + A) }, checkNodes: function (A) { var B = A; do { if (this.options.tags && bkLib.inArray(this.options.tags, B.nodeName)) { this.activate(); return true } } while (B = B.parentNode && B.className != "nicEdit"); B = $BK(A); while (B.nodeType == 3) { B = $BK(B.parentNode) } if (this.options.css) { for (itm in this.options.css) { if (B.getStyle(itm, this.ne.selectedInstance.instanceDoc) == this.options.css[itm]) { this.activate(); return true } } } this.deactivate(); return false }, activate: function () { if (!this.isDisabled) { this.isActive = true; this.updateState(); this.ne.fireEvent("buttonActivate", this) } }, deactivate: function () { this.isActive = false; this.updateState(); if (!this.isDisabled) { this.ne.fireEvent("buttonDeactivate", this) } }, enable: function (A, B) { this.isDisabled = false; this.contain.setStyle({ opacity: 1 }).addClass("buttonEnabled"); this.updateState(); this.checkNodes(B) }, disable: function (A, B) { this.isDisabled = true; this.contain.setStyle({ opacity: 0.6 }).removeClass("buttonEnabled"); this.updateState() }, toggleActive: function () { (this.isActive) ? this.deactivate() : this.activate() }, hoverOn: function () { if (!this.isDisabled) { this.isHover = true; this.updateState(); this.ne.fireEvent("buttonOver", this) } }, hoverOff: function () { this.isHover = false; this.updateState(); this.ne.fireEvent("buttonOut", this) }, mouseClick: function () { if (this.options.command) { this.ne.nicCommand(this.options.command, this.options.commandArgs); if (!this.options.noActive) { this.toggleActive() } } this.ne.fireEvent("buttonClick", this) }, key: function (A, B) { if (this.options.key && B.ctrlKey && String.fromCharCode(B.keyCode || B.charCode).toLowerCase() == this.options.key) { this.mouseClick(); if (B.preventDefault) { B.preventDefault() } } } });
var nicPlugin = bkClass.extend({ construct: function (B, A) { this.options = A; this.ne = B; this.ne.addEvent("panel", this.loadPanel.closure(this)); this.init() }, loadPanel: function (C) { var B = this.options.buttons; for (var A in B) { C.addButton(A, this.options) } C.reorder() }, init: function () { } });


var nicPaneOptions = {};

var nicEditorPane = bkClass.extend({ construct: function (D, C, B, A) { this.ne = C; this.elm = D; this.pos = D.pos(); this.contain = new bkElement("div").setStyle({ zIndex: "99999", overflow: "hidden", position: "absolute", left: this.pos[0] + "px", top: this.pos[1] + "px" }); this.pane = new bkElement("div").setStyle({ fontSize: "12px", border: "1px solid #ccc", overflow: "hidden", padding: "4px", textAlign: "left", backgroundColor: "#ffffc9" }).addClass("pane").setStyle(B).appendTo(this.contain); if (A && !A.options.noClose) { this.close = new bkElement("div").setStyle({ "float": "right", height: "16px", width: "16px", cursor: "pointer" }).setStyle(this.ne.getIcon("close", nicPaneOptions)).addEvent("mousedown", A.removePane.closure(this)).appendTo(this.pane) } this.contain.noSelect().appendTo(document.body); this.position(); this.init() }, init: function () { }, position: function () { if (this.ne.nicPanel) { var B = this.ne.nicPanel.elm; var A = B.pos(); var C = A[0] + parseInt(B.getStyle("width")) - (parseInt(this.pane.getStyle("width")) + 8); if (C < this.pos[0]) { this.contain.setStyle({ left: C + "px" }) } } }, toggle: function () { this.isVisible = !this.isVisible; this.contain.setStyle({ display: ((this.isVisible) ? "block" : "none") }) }, remove: function () { if (this.contain) { this.contain.remove(); this.contain = null } }, append: function (A) { A.appendTo(this.pane) }, setContent: function (A) { this.pane.setContent(A) } });

var nicEditorAdvancedButton = nicEditorButton.extend({ init: function () { this.ne.addEvent("selected", this.removePane.closure(this)).addEvent("blur", this.removePane.closure(this)) }, mouseClick: function () { if (!this.isDisabled) { if (this.pane && this.pane.pane) { this.removePane() } else { this.pane = new nicEditorPane(this.contain, this.ne, { width: (this.width || "270px"), backgroundColor: "#fff" }, this); this.addPane(); this.ne.selectedInstance.saveRng() } } }, addForm: function (C, G) { this.form = new bkElement("form").addEvent("submit", this.submit.closureListener(this)); this.pane.append(this.form); this.inputs = {}; for (itm in C) { var D = C[itm]; var F = ""; if (G) { F = G.getAttribute(itm) } if (!F) { F = D.value || "" } var A = C[itm].type; if (A == "title") { new bkElement("div").setContent(D.txt).setStyle({ fontSize: "14px", fontWeight: "bold", padding: "0px", margin: "2px 0" }).appendTo(this.form) } else { var B = new bkElement("div").setStyle({ overflow: "hidden", clear: "both" }).appendTo(this.form); if (D.txt) { new bkElement("label").setAttributes({ "for": itm }).setContent(D.txt).setStyle({ margin: "2px 4px", fontSize: "13px", width: "50px", lineHeight: "20px", textAlign: "right", "float": "left" }).appendTo(B) } switch (A) { case "text": this.inputs[itm] = new bkElement("input").setAttributes({ id: itm, value: F, type: "text" }).setStyle({ margin: "2px 0", fontSize: "13px", "float": "left", height: "20px", /*border: "1px solid #ccc",*/ overflow: "hidden" }).setStyle(D.style).appendTo(B); break; case "select": this.inputs[itm] = new bkElement("select").setAttributes({ id: itm }).setStyle({ border: "1px solid #ccc", "float": "left", margin: "2px 0" }).appendTo(B); for (opt in D.options) { var E = new bkElement("option").setAttributes({ value: opt, selected: (opt == F) ? "selected" : "" }).setContent(D.options[opt]).appendTo(this.inputs[itm]) } break; case "content": this.inputs[itm] = new bkElement("textarea").setAttributes({ id: itm }).setStyle({ border: "1px solid #ccc", "float": "left" }).setStyle(D.style).appendTo(B); this.inputs[itm].value = F } } } new bkElement("input").setAttributes({ type: "submit" }).setStyle({ backgroundColor: "#efefef", border: "1px solid #ccc", margin: "3px 0", "float": "left", clear: "both" }).appendTo(this.form); this.form.onsubmit = bkLib.cancelEvent }, submit: function () { }, findElm: function (B, A, E) { var D = this.ne.selectedInstance.getElm().getElementsByTagName(B); for (var C = 0; C < D.length; C++) { if (D[C].getAttribute(A) == E) { return $BK(D[C]) } } }, removePane: function () { if (this.pane) { this.pane.remove(); this.pane = null; this.ne.selectedInstance.restoreRng() } } });

var nicButtonTips = bkClass.extend({ construct: function (A) { this.ne = A; A.addEvent("buttonOver", this.show.closure(this)).addEvent("buttonOut", this.hide.closure(this)) }, show: function (A) { this.timer = setTimeout(this.create.closure(this, A), 400) }, create: function (A) { this.timer = null; if (!this.pane) { this.pane = new nicEditorPane(A.button, this.ne, { fontSize: "12px", marginTop: "5px" }); this.pane.setContent(A.options.name) } }, hide: function (A) { if (this.timer) { clearTimeout(this.timer) } if (this.pane) { this.pane = this.pane.remove() } } }); nicEditors.registerPlugin(nicButtonTips);


var nicSelectOptions = {
	buttons: {
		'fontSize': { name: __('Select Font Size'), type: 'nicEditorFontSizeSelect', command: 'fontsize' },
		'fontFamily': { name: __('Select Font Family'), type: 'nicEditorFontFamilySelect', command: 'fontname' },
		'fontFormat': { name: __('Select Font Format'), type: 'nicEditorFontFormatSelect', command: 'formatBlock' }
	}
};

var nicEditorSelect = bkClass.extend({ construct: function (D, A, C, B) { this.options = C.buttons[A]; this.elm = D; this.ne = B; this.name = A; this.selOptions = new Array(); this.margin = new bkElement("div").setStyle({ "float": "left", margin: "2px 1px 0 1px" }).appendTo(this.elm); this.contain = new bkElement("div").setStyle({ width: "90px", height: "20px", cursor: "pointer", overflow: "hidden" }).addClass("selectContain").addEvent("click", this.toggle.closure(this)).appendTo(this.margin); this.items = new bkElement("div").setStyle({ overflow: "hidden", zoom: 1, border: "1px solid #ccc", paddingLeft: "3px", backgroundColor: "#fff" }).appendTo(this.contain); this.control = new bkElement("div").setStyle({ overflow: "hidden", "float": "right", height: "18px", width: "16px" }).addClass("selectControl").setStyle(this.ne.getIcon("arrow", C)).appendTo(this.items); this.txt = new bkElement("div").setStyle({ overflow: "hidden", "float": "left", width: "66px", height: "14px", marginTop: "1px", fontFamily: "sans-serif", textAlign: "center", fontSize: "12px" }).addClass("selectTxt").appendTo(this.items); if (!window.opera) { this.contain.onmousedown = this.control.onmousedown = this.txt.onmousedown = bkLib.cancelEvent } this.margin.noSelect(); this.ne.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this)); this.disable(); this.init() }, disable: function () { this.isDisabled = true; this.close(); this.contain.setStyle({ opacity: 0.6 }) }, enable: function (A) { this.isDisabled = false; this.close(); this.contain.setStyle({ opacity: 1 }) }, setDisplay: function (A) { this.txt.setContent(A) }, toggle: function () { if (!this.isDisabled) { (this.pane) ? this.close() : this.open() } }, open: function () { this.pane = new nicEditorPane(this.items, this.ne, { width: "88px", padding: "0px", borderTop: 0, borderLeft: "1px solid #ccc", borderRight: "1px solid #ccc", borderBottom: "0px", backgroundColor: "#fff" }); for (var C = 0; C < this.selOptions.length; C++) { var B = this.selOptions[C]; var A = new bkElement("div").setStyle({ overflow: "hidden", borderBottom: "1px solid #ccc", width: "88px", textAlign: "left", overflow: "hidden", cursor: "pointer" }); var D = new bkElement("div").setStyle({ padding: "0px 4px" }).setContent(B[1]).appendTo(A).noSelect(); D.addEvent("click", this.update.closure(this, B[0])).addEvent("mouseover", this.over.closure(this, D)).addEvent("mouseout", this.out.closure(this, D)).setAttributes("id", B[0]); this.pane.append(A); if (!window.opera) { D.onmousedown = bkLib.cancelEvent } } }, close: function () { if (this.pane) { this.pane = this.pane.remove() } }, over: function (A) { A.setStyle({ backgroundColor: "#ccc" }) }, out: function (A) { A.setStyle({ backgroundColor: "#fff" }) }, add: function (B, A) { this.selOptions.push(new Array(B, A)) }, update: function (A) { this.ne.nicCommand(this.options.command, A); this.close() } }); var nicEditorFontSizeSelect = nicEditorSelect.extend({ sel: { 1: "1&nbsp;(8pt)", 2: "2&nbsp;(10pt)", 3: "3&nbsp;(12pt)", 4: "4&nbsp;(14pt)", 5: "5&nbsp;(18pt)", 6: "6&nbsp;(24pt)" }, init: function () { this.setDisplay("Font&nbsp;Size..."); for (itm in this.sel) { this.add(itm, '<font size="' + itm + '">' + this.sel[itm] + "</font>") } } }); var nicEditorFontFamilySelect = nicEditorSelect.extend({ sel: { arial: "Arial", "comic sans ms": "Comic Sans", "courier new": "Courier New", georgia: "Georgia", helvetica: "Helvetica", impact: "Impact", "times new roman": "Times", "trebuchet ms": "Trebuchet", verdana: "Verdana" }, init: function () { this.setDisplay("Font&nbsp;Family..."); for (itm in this.sel) { this.add(itm, '<font face="' + itm + '">' + this.sel[itm] + "</font>") } } }); var nicEditorFontFormatSelect = nicEditorSelect.extend({ sel: { p: "Paragraph", pre: "Pre", h6: "Heading&nbsp;6", h5: "Heading&nbsp;5", h4: "Heading&nbsp;4", h3: "Heading&nbsp;3", h2: "Heading&nbsp;2", h1: "Heading&nbsp;1" }, init: function () { this.setDisplay("Font&nbsp;Format..."); for (itm in this.sel) { var A = itm.toUpperCase(); this.add("<" + A + ">", "<" + itm + ' style="padding: 0px; margin: 0px;">' + this.sel[itm] + "</" + A + ">") } } }); nicEditors.registerPlugin(nicPlugin, nicSelectOptions);


var nicLinkOptions = {
	buttons: {
		'link': { name: 'Add Link', type: 'nicLinkButton', tags: ['A'] },
		'unlink': { name: 'Remove Link', command: 'unlink', noActive: true }
	}
};

var nicLinkButton = nicEditorAdvancedButton.extend({ addPane: function () { this.ln = this.ne.selectedInstance.selElm().parentTag("A"); this.addForm({ "": { type: "title", txt: "Add/Edit Link" }, href: { type: "text", txt: "URL", value: "http://", style: { width: "150px" } }, title: { type: "text", txt: "Title" }, target: { type: "select", txt: "Open In", options: { "": "Current Window", _blank: "New Window" }, style: { width: "100px" } } }, this.ln) }, submit: function (C) { var A = this.inputs.href.value; if (A == "http://" || A == "") { alert("You must enter a URL to Create a Link"); return false } this.removePane(); if (!this.ln) { var B = "javascript:nicTemp();"; this.ne.nicCommand("createlink", B); this.ln = this.findElm("A", "href", B) } if (this.ln) { this.ln.setAttributes({ href: this.inputs.href.value, title: this.inputs.title.value, target: this.inputs.target.options[this.inputs.target.selectedIndex].value }) } } }); nicEditors.registerPlugin(nicPlugin, nicLinkOptions);


var nicColorOptions = {
	buttons: {
		'forecolor': { name: __('Change Text Color'), type: 'nicEditorColorButton', noClose: true },
		'bgcolor': { name: __('Change Background Color'), type: 'nicEditorBgColorButton', noClose: true }
	}
};

var nicEditorColorButton = nicEditorAdvancedButton.extend({ addPane: function () { var D = { 0: "00", 1: "33", 2: "66", 3: "99", 4: "CC", 5: "FF" }; var H = new bkElement("DIV").setStyle({ width: "270px" }); for (var A in D) { for (var F in D) { for (var E in D) { var I = "#" + D[A] + D[E] + D[F]; var C = new bkElement("DIV").setStyle({ cursor: "pointer", height: "15px", "float": "left" }).appendTo(H); var G = new bkElement("DIV").setStyle({ border: "2px solid " + I }).appendTo(C); var B = new bkElement("DIV").setStyle({ backgroundColor: I, overflow: "hidden", width: "11px", height: "11px" }).addEvent("click", this.colorSelect.closure(this, I)).addEvent("mouseover", this.on.closure(this, G)).addEvent("mouseout", this.off.closure(this, G, I)).appendTo(G); if (!window.opera) { C.onmousedown = B.onmousedown = bkLib.cancelEvent } } } } this.pane.append(H.noSelect()) }, colorSelect: function (A) { this.ne.nicCommand("foreColor", A); this.removePane() }, on: function (A) { A.setStyle({ border: "2px solid #000" }) }, off: function (A, B) { A.setStyle({ border: "2px solid " + B }) } }); var nicEditorBgColorButton = nicEditorColorButton.extend({ colorSelect: function (A) { this.ne.nicCommand("hiliteColor", A); this.removePane() } }); nicEditors.registerPlugin(nicPlugin, nicColorOptions);


var nicImageOptions = {
	buttons: {
		'image': { name: 'Add Image', type: 'nicImageButton', tags: ['IMG'] }
	}

};

var nicImageButton = nicEditorAdvancedButton.extend({ addPane: function () { this.im = this.ne.selectedInstance.selElm().parentTag("IMG"); this.addForm({ "": { type: "title", txt: "Add/Edit Image" }, src: { type: "text", txt: "URL", value: "http://", style: { width: "150px" } }, alt: { type: "text", txt: "Alt Text", style: { width: "100px" } }, align: { type: "select", txt: "Align", options: { none: "Default", left: "Left", right: "Right" } } }, this.im) }, submit: function (B) { var C = this.inputs.src.value; if (C == "" || C == "http://") { alert("You must enter a Image URL to insert"); return false } this.removePane(); if (!this.im) { var A = "javascript:nicImTemp();"; this.ne.nicCommand("insertImage", A); this.im = this.findElm("IMG", "src", A) } if (this.im) { this.im.setAttributes({ src: this.inputs.src.value, alt: this.inputs.alt.value, align: this.inputs.align.value }) } } }); nicEditors.registerPlugin(nicPlugin, nicImageOptions);


var nicSaveOptions = {
	buttons: {
		'save': { name: __('Save this content'), type: 'nicEditorSaveButton' }
	}
};

var nicEditorSaveButton = nicEditorButton.extend({ init: function () { if (!this.ne.options.onSave) { this.margin.setStyle({ display: "none" }) } }, mouseClick: function () { var B = this.ne.options.onSave; var A = this.ne.selectedInstance; B(A.getContent(), A.elm.id, A) } }); nicEditors.registerPlugin(nicPlugin, nicSaveOptions);


// tagify

!(function (t, e) {
	'object' == typeof exports && 'undefined' != typeof module
		? (module.exports = e())
		: 'function' == typeof define && define.amd
		? define(e)
		: ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Tagify = e())
})(this, function () {
	'use strict'
	function t(e) {
		return (t =
			'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
				? function (t) {
						return typeof t
				  }
				: function (t) {
						return t &&
							'function' == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? 'symbol'
							: typeof t
				  })(e)
	}
	function e(t, e, i) {
		return (
			e in t
				? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
				: (t[e] = i),
			t
		)
	}
	function i(t, e) {
		var i = Object.keys(t)
		if (Object.getOwnPropertySymbols) {
			var s = Object.getOwnPropertySymbols(t)
			e &&
				(s = s.filter(function (e) {
					return Object.getOwnPropertyDescriptor(t, e).enumerable
				})),
				i.push.apply(i, s)
		}
		return i
	}
	function s(t) {
		for (var s = 1; s < arguments.length; s++) {
			var a = null != arguments[s] ? arguments[s] : {}
			s % 2
				? i(Object(a), !0).forEach(function (i) {
						e(t, i, a[i])
				  })
				: Object.getOwnPropertyDescriptors
				? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a))
				: i(Object(a)).forEach(function (e) {
						Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e))
				  })
		}
		return t
	}
	function a(t) {
		return (
			(function (t) {
				if (Array.isArray(t)) return n(t)
			})(t) ||
			(function (t) {
				if ('undefined' != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
			})(t) ||
			(function (t, e) {
				if (!t) return
				if ('string' == typeof t) return n(t, e)
				var i = Object.prototype.toString.call(t).slice(8, -1)
				'Object' === i && t.constructor && (i = t.constructor.name)
				if ('Map' === i || 'Set' === i) return Array.from(t)
				if ('Arguments' === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return n(t, e)
			})(t) ||
			(function () {
				throw new TypeError(
					'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
				)
			})()
		)
	}
	function n(t, e) {
		;(null == e || e > t.length) && (e = t.length)
		for (var i = 0, s = new Array(e); i < e; i++) s[i] = t[i]
		return s
	}
	var o = function (t, e, i) {
		return i ? t == e : ('' + t).toLowerCase() == ('' + e).toLowerCase()
	}
	function r(t) {
		var e = Object.prototype.toString.call(t).split(' ')[1].slice(0, -1)
		return (
			t === Object(t) && 'Array' != e && 'Function' != e && 'RegExp' != e && 'HTMLUnknownElement' != e
		)
	}
	function l(t) {
		return t
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/`|'/g, '&#039;')
	}
	function d(t, e, i) {
		function s(t, e) {
			for (var i in e)
				e.hasOwnProperty(i) &&
					(r(e[i]) ? (r(t[i]) ? s(t[i], e[i]) : (t[i] = Object.assign({}, e[i]))) : (t[i] = e[i]))
		}
		return t instanceof Object || (t = {}), s(t, e), i && s(t, i), t
	}
	function c(t) {
		return String.prototype.normalize
			? 'string' == typeof t
				? t.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
				: void 0
			: t
	}
	var h = {
			init: function () {
				;(this.DOM.dropdown = this.parseTemplate('dropdown', [this.settings])),
					(this.DOM.dropdown.content = this.DOM.dropdown.querySelector(
						'.' + this.settings.classNames.dropdownWrapper
					))
			},
			show: function (t) {
				var e,
					i,
					s,
					a = this,
					n = this.settings,
					l = window.getSelection(),
					d = 'mix' == n.mode && !n.enforceWhitelist,
					c = !n.whitelist || !n.whitelist.length,
					h = 'manual' == n.dropdown.position
				if (
					(!c || d || n.templates.dropdownItemNoMatch) &&
					!1 !== n.dropdown.enable &&
					!this.state.isLoading
				) {
					if (
						(clearTimeout(this.dropdownHide__bindEventsTimeout),
						(this.suggestedListItems = this.dropdown.filterListItems.call(this, t)),
						t &&
							!this.suggestedListItems.length &&
							(this.trigger('dropdown:noMatch', t),
							n.templates.dropdownItemNoMatch &&
								(s = n.templates.dropdownItemNoMatch.call(this, { value: t }))),
						!s)
					) {
						if (this.suggestedListItems.length)
							t &&
								d &&
								!this.state.editing.scope &&
								!o(this.suggestedListItems[0].value, t) &&
								this.suggestedListItems.unshift({ value: t })
						else {
							if (!t || !d || this.state.editing.scope)
								return (
									this.input.autocomplete.suggest.call(this),
									void this.dropdown.hide.call(this)
								)
							this.suggestedListItems = [{ value: t }]
						}
						;(i = '' + (r((e = this.suggestedListItems[0])) ? e.value : e)),
							n.autoComplete &&
								i &&
								0 == i.indexOf(t) &&
								this.input.autocomplete.suggest.call(this, e)
					}
					this.dropdown.fill.call(this, s),
						n.dropdown.highlightFirst &&
							this.dropdown.highlightOption.call(this, this.DOM.dropdown.content.children[0]),
						this.state.dropdown.visible || setTimeout(this.dropdown.events.binding.bind(this)),
						(this.state.dropdown.visible = t || !0),
						(this.state.dropdown.query = t),
						(this.state.selection = { anchorOffset: l.anchorOffset, anchorNode: l.anchorNode }),
						h ||
							setTimeout(function () {
								a.dropdown.position.call(a), a.dropdown.render.call(a)
							}),
						setTimeout(function () {
							a.trigger('dropdown:show', a.DOM.dropdown)
						})
				}
			},
			hide: function (t) {
				var e = this,
					i = this.DOM,
					s = i.scope,
					a = i.dropdown,
					n = 'manual' == this.settings.dropdown.position && !t
				if (a && document.body.contains(a) && !n)
					return (
						window.removeEventListener('resize', this.dropdown.position),
						this.dropdown.events.binding.call(this, !1),
						s.setAttribute('aria-expanded', !1),
						a.parentNode.removeChild(a),
						setTimeout(function () {
							e.state.dropdown.visible = !1
						}, 100),
						(this.state.dropdown.query = this.state.ddItemData = this.state.ddItemElm = this.state.selection = null),
						this.state.tag &&
							this.state.tag.value.length &&
							(this.state.flaggedTags[this.state.tag.baseOffset] = this.state.tag),
						this.trigger('dropdown:hide', a),
						this
					)
			},
			render: function () {
				var t,
					e,
					i,
					s = this,
					a =
						((t = this.DOM.dropdown),
						((i = t.cloneNode(!0)).style.cssText = 'position:fixed; top:-9999px; opacity:0'),
						document.body.appendChild(i),
						(e = i.clientHeight),
						i.parentNode.removeChild(i),
						e),
					n = this.settings
				return (
					this.DOM.scope.setAttribute('aria-expanded', !0),
					document.body.contains(this.DOM.dropdown) ||
						(this.DOM.dropdown.classList.add(n.classNames.dropdownInital),
						this.dropdown.position.call(this, a),
						n.dropdown.appendTarget.appendChild(this.DOM.dropdown),
						setTimeout(function () {
							return s.DOM.dropdown.classList.remove(n.classNames.dropdownInital)
						})),
					this
				)
			},
			fill: function (t) {
				var e
				;(t =
					'string' == typeof t
						? t
						: this.dropdown.createListHTML.call(this, t || this.suggestedListItems)),
					(this.DOM.dropdown.content.innerHTML = (e = t)
						? e.replace(/\>[\r\n ]+\</g, '><').replace(/(<.*?>)|\s+/g, function (t, e) {
								return e || ' '
						  })
						: '')
			},
			refilter: function (t) {
				;(t = t || this.state.dropdown.query || ''),
					(this.suggestedListItems = this.dropdown.filterListItems.call(this, t)),
					this.suggestedListItems.length
						? this.dropdown.fill.call(this)
						: this.dropdown.hide.call(this),
					this.trigger('dropdown:updated', this.DOM.dropdown)
			},
			position: function (t) {
				if ('manual' != this.settings.dropdown.position) {
					var e,
						i,
						s,
						a,
						n,
						o,
						r,
						l = this.DOM.dropdown,
						d = document.documentElement.clientHeight,
						c =
							Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 480
								? this.settings.dropdown.position
								: 'all',
						h = this.DOM['input' == c ? 'input' : 'scope']
					;(t = t || l.clientHeight),
						this.state.dropdown.visible &&
							('text' == c
								? ((a = (i = this.getCaretGlobalPosition()).bottom),
								  (s = i.top),
								  (n = i.left),
								  (o = 'auto'))
								: ((r = (function (t) {
										for (var e = 0, i = 0; t; )
											(e += t.offsetLeft || 0),
												(i += t.offsetTop || 0),
												(t = t.parentNode)
										return { left: e, top: i }
								  })(this.settings.dropdown.appendTarget)),
								  (s = (i = h.getBoundingClientRect()).top + 2 - r.top),
								  (a = i.bottom - 1 - r.top),
								  (n = i.left - r.left),
								  (o = i.width + 'px')),
							(s = Math.floor(s)),
							(a = Math.ceil(a)),
							(e = d - i.bottom < t),
							(l.style.cssText =
								'left:' +
								(n + window.pageXOffset) +
								'px; width:' +
								o +
								';' +
								(e
									? 'top: ' + (s + window.pageYOffset) + 'px'
									: 'top: ' + (a + window.pageYOffset) + 'px')),
							l.setAttribute('placement', e ? 'top' : 'bottom'),
							l.setAttribute('position', c))
				}
			},
			events: {
				binding: function () {
					var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
						e = this.dropdown.events.callbacks,
						i = (this.listeners.dropdown = this.listeners.dropdown || {
							position: this.dropdown.position.bind(this),
							onKeyDown: e.onKeyDown.bind(this),
							onMouseOver: e.onMouseOver.bind(this),
							onMouseLeave: e.onMouseLeave.bind(this),
							onClick: e.onClick.bind(this),
							onScroll: e.onScroll.bind(this),
						}),
						s = t ? 'addEventListener' : 'removeEventListener'
					'manual' != this.settings.dropdown.position &&
						(window[s]('resize', i.position), window[s]('keydown', i.onKeyDown)),
						this.DOM.dropdown[s]('mouseover', i.onMouseOver),
						this.DOM.dropdown[s]('mouseleave', i.onMouseLeave),
						this.DOM.dropdown[s]('mousedown', i.onClick),
						this.DOM.dropdown.content[s]('scroll', i.onScroll)
				},
				callbacks: {
					onKeyDown: function (t) {
						var e = this.DOM.dropdown.querySelector("[class$='--active']"),
							i = e
						switch (t.key) {
							case 'ArrowDown':
							case 'ArrowUp':
							case 'Down':
							case 'Up':
								var s
								t.preventDefault(),
									i &&
										(i =
											i[
												('ArrowUp' == t.key || 'Up' == t.key ? 'previous' : 'next') +
													'ElementSibling'
											]),
									i ||
										(i = (s = this.DOM.dropdown.content.children)[
											'ArrowUp' == t.key || 'Up' == t.key ? s.length - 1 : 0
										]),
									this.dropdown.highlightOption.call(this, i, !0)
								break
							case 'Escape':
							case 'Esc':
								this.dropdown.hide.call(this)
								break
							case 'ArrowRight':
								if (this.state.actions.ArrowLeft) return
							case 'Tab':
								if (
									'mix' != this.settings.mode &&
									i &&
									!this.settings.autoComplete.rightKey &&
									!this.state.editing
								) {
									t.preventDefault()
									var a = i.getAttribute('tagifySuggestionIdx'),
										n = a ? this.suggestedListItems[+a] : ''
									return this.input.autocomplete.set.call(this, n.value || n), !1
								}
								return !0
							case 'Enter':
								t.preventDefault(), this.dropdown.selectOption.call(this, e)
								break
							case 'Backspace':
								if ('mix' == this.settings.mode || this.state.editing.scope) return
								var o = this.input.value.trim()
								;('' != o && 8203 != o.charCodeAt(0)) ||
									(!0 === this.settings.backspace
										? this.removeTags()
										: 'edit' == this.settings.backspace &&
										  setTimeout(this.editTag.bind(this), 0))
						}
					},
					onMouseOver: function (t) {
						var e = t.target.closest('.' + this.settings.classNames.dropdownItem)
						e && this.dropdown.highlightOption.call(this, e)
					},
					onMouseLeave: function (t) {
						this.dropdown.highlightOption.call(this)
					},
					onClick: function (t) {
						var e = this
						if (0 == t.button && t.target != this.DOM.dropdown) {
							var i = t.target.closest('.' + this.settings.classNames.dropdownItem)
							;(this.state.actions.selectOption = !0),
								setTimeout(function () {
									return (e.state.actions.selectOption = !1)
								}, 50),
								this.settings.hooks
									.suggestionClick(t, { tagify: this, suggestionElm: i })
									.then(function () {
										i && e.dropdown.selectOption.call(e, i)
									})
									.catch(function (t) {
										return t
									})
						}
					},
					onScroll: function (t) {
						var e = t.target,
							i = (e.scrollTop / (e.scrollHeight - e.parentNode.clientHeight)) * 100
						this.trigger('dropdown:scroll', { percentage: Math.round(i) })
					},
				},
			},
			highlightOption: function (t, e) {
				var i,
					s = this.settings.classNames.dropdownItemActive
				if (
					(this.state.ddItemElm &&
						(this.state.ddItemElm.classList.remove(s),
						this.state.ddItemElm.removeAttribute('aria-selected')),
					!t)
				)
					return (
						(this.state.ddItemData = null),
						(this.state.ddItemElm = null),
						void this.input.autocomplete.suggest.call(this)
					)
				;(i = this.suggestedListItems[this.getNodeIndex(t)]),
					(this.state.ddItemData = i),
					(this.state.ddItemElm = t),
					t.classList.add(s),
					t.setAttribute('aria-selected', !0),
					e && (t.parentNode.scrollTop = t.clientHeight + t.offsetTop - t.parentNode.clientHeight),
					this.settings.autoComplete &&
						(this.input.autocomplete.suggest.call(this, i), this.dropdown.position.call(this))
			},
			selectOption: function (t) {
				var e = this,
					i = this.settings.dropdown,
					a = i.clearOnSelect,
					n = i.closeOnSelect
				if (!t) return this.addTags(this.input.value, !0), void (n && this.dropdown.hide.call(this))
				var o = t.getAttribute('tagifySuggestionIdx'),
					r = (o ? this.suggestedListItems[+o] : '') || this.input.value
				if (
					(this.trigger('dropdown:select', { data: r, elm: t }),
					this.state.editing
						? this.onEditTagDone(
								this.state.editing.scope,
								s(
									s(
										s({}, this.state.editing.scope.__tagifyTagData),
										{},
										{ value: r.value },
										r instanceof Object ? r : {}
									),
									{},
									{ __isValid: !0 }
								)
						  )
						: this.addTags([r], a),
					setTimeout(function () {
						e.DOM.input.focus(), e.toggleFocusClass(!0)
					}),
					n)
				)
					return this.dropdown.hide.call(this)
				this.dropdown.refilter.call(this)
			},
			selectAll: function () {
				var t = this.settings.skipInvalid
				return (
					(this.settings.skipInvalid = !0),
					this.addTags(this.settings.whitelist, !0),
					(this.settings.skipInvalid = t),
					this.dropdown.hide.call(this),
					this
				)
			},
			filterListItems: function (t) {
				var e,
					i,
					s,
					a,
					n,
					o = this,
					l = this.settings,
					d = l.dropdown,
					h = [],
					g = l.whitelist,
					u = d.maxItems || 1 / 0,
					p = d.searchKeys,
					f = 0
				if (!t || !p.length)
					return (l.duplicates
						? g
						: g.filter(function (t) {
								return !o.isTagDuplicate(r(t) ? t.value : t)
						  })
					).slice(0, u)
				function m(t, e) {
					return e
						.toLowerCase()
						.split(' ')
						.every(function (e) {
							return t.includes(e.toLowerCase())
						})
				}
				for (
					n = d.caseSensitive ? '' + t : ('' + t).toLowerCase();
					f < g.length &&
					((e = g[f] instanceof Object ? g[f] : { value: g[f] }),
					d.fuzzySearch
						? ((s = p
								.reduce(function (t, i) {
									return t + ' ' + (e[i] || '')
								}, '')
								.toLowerCase()),
						  (i = m(d.accentedSearch ? c(s) : s, n)))
						: (i = p.some(function (t) {
								var i = '' + (e[t] || '')
								return (
									d.accentedSearch && ((i = c(i)), (n = c(n))),
									d.caseSensitive || (i = i.toLowerCase()),
									0 == i.indexOf(n)
								)
						  })),
					(a = !l.duplicates && this.isTagDuplicate(r(e) ? e.value : e)),
					i && !a && u-- && h.push(e),
					0 != u);
					f++
				);
				return h
			},
			createListHTML: function (t) {
				var e = this
				return t
					.map(function (t, i) {
						;('string' != typeof t && 'number' != typeof t) || (t = { value: t })
						var s = e.settings.dropdown.mapValueTo,
							a = s ? ('function' == typeof s ? s(t) : t[s]) : t.value,
							n = d({}, t, {
								value: a && 'string' == typeof a ? l(a) : a,
								tagifySuggestionIdx: i,
							})
						return e.settings.templates.dropdownItem.call(e, n)
					})
					.join('')
			},
		},
		g = {
			delimiters: ',',
			pattern: null,
			tagTextProp: 'value',
			maxTags: 1 / 0,
			callbacks: {},
			addTagOnBlur: !0,
			duplicates: !1,
			whitelist: [],
			blacklist: [],
			enforceWhitelist: !1,
			keepInvalidTags: !1,
			mixTagsAllowedAfter: /,|\.|\:|\s/,
			mixTagsInterpolator: ['[[', ']]'],
			backspace: !0,
			skipInvalid: !1,
			editTags: 2,
			transformTag: function () {},
			trim: !0,
			mixMode: { insertAfterTag: ' ' },
			autoComplete: { enabled: !0, rightKey: !1 },
			classNames: {
				namespace: 'tagify',
				input: 'tagify__input',
				focus: 'tagify--focus',
				tag: 'tagify__tag',
				tagNoAnimation: 'tagify--noAnim',
				tagInvalid: 'tagify--invalid',
				tagNotAllowed: 'tagify--notAllowed',
				inputInvalid: 'tagify__input--invalid',
				tagX: 'tagify__tag__removeBtn',
				tagText: 'tagify__tag-text',
				dropdown: 'tagify__dropdown',
				dropdownWrapper: 'tagify__dropdown__wrapper',
				dropdownItem: 'tagify__dropdown__item',
				dropdownItemActive: 'tagify__dropdown__item--active',
				dropdownInital: 'tagify__dropdown--initial',
				scopeLoading: 'tagify--loading',
				tagLoading: 'tagify__tag--loading',
				tagEditing: 'tagify__tag--editable',
				tagFlash: 'tagify__tag--flash',
				tagHide: 'tagify__tag--hide',
				hasMaxTags: 'tagify--hasMaxTags',
				hasNoTags: 'tagify--noTags',
				empty: 'tagify--empty',
			},
			dropdown: {
				classname: '',
				enabled: 2,
				maxItems: 10,
				searchKeys: ['value', 'searchBy'],
				fuzzySearch: !0,
				caseSensitive: !1,
				accentedSearch: !0,
				highlightFirst: !1,
				closeOnSelect: !0,
				clearOnSelect: !0,
				position: 'all',
				appendTarget: null,
			},
			hooks: {
				beforeRemoveTag: function () {
					return Promise.resolve()
				},
				suggestionClick: function () {
					return Promise.resolve()
				},
			},
		}
	var u = {
		customBinding: function () {
			var t = this
			this.customEventsList.forEach(function (e) {
				t.on(e, t.settings.callbacks[e])
			})
		},
		binding: function () {
			var t,
				e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
				i = this.events.callbacks,
				s = e ? 'addEventListener' : 'removeEventListener'
			if (!this.state.mainEvents || !e)
				for (var a in ((this.state.mainEvents = e),
				e &&
					!this.listeners.main &&
					(this.DOM.input.addEventListener(
						this.isIE ? 'keydown' : 'input',
						i[this.isIE ? 'onInputIE' : 'onInput'].bind(this)
					),
					this.settings.isJQueryPlugin &&
						jQuery(this.DOM.originalInput).on(
							'tagify.removeAllTags',
							this.removeAllTags.bind(this)
						)),
				(t = this.listeners.main = this.listeners.main || {
					focus: ['input', i.onFocusBlur.bind(this)],
					blur: ['input', i.onFocusBlur.bind(this)],
					keydown: ['input', i.onKeydown.bind(this)],
					click: ['scope', i.onClickScope.bind(this)],
					dblclick: ['scope', i.onDoubleClickScope.bind(this)],
					paste: ['input', i.onPaste.bind(this)],
				})))
					('blur' != a || e) && this.DOM[t[a][0]][s](a, t[a][1])
		},
		callbacks: {
			onFocusBlur: function (t) {
				var e = t.target ? this.trim(t.target.textContent) : '',
					i = this.settings,
					s = t.type,
					a = i.dropdown.enabled >= 0,
					n = { relatedTarget: t.relatedTarget },
					o = this.state.actions.selectOption && (a || !i.dropdown.closeOnSelect),
					r = this.state.actions.addNew && a,
					l = window.getSelection()
				if ('blur' == s) {
					if (t.relatedTarget === this.DOM.scope)
						return this.dropdown.hide.call(this), void this.DOM.input.focus()
					this.postUpdate(), this.triggerChangeEvent()
				}
				if (!o && !r)
					if (
						((this.state.hasFocus = 'focus' == s && +new Date()),
						this.toggleFocusClass(this.state.hasFocus),
						'mix' != i.mode)
					) {
						if ('focus' == s)
							return (
								this.trigger('focus', n),
								void (0 === i.dropdown.enabled && this.dropdown.show.call(this))
							)
						'blur' == s &&
							(this.trigger('blur', n),
							this.loading(!1),
							('select' == this.settings.mode
								? !this.value.length || this.value[0].value != e
								: e && !this.state.actions.selectOption && i.addTagOnBlur) &&
								this.addTags(e, !0)),
							this.DOM.input.removeAttribute('style'),
							this.dropdown.hide.call(this)
					} else
						'focus' == s
							? this.trigger('focus', n)
							: 'blur' == t.type &&
							  (this.trigger('blur', n),
							  this.loading(!1),
							  this.dropdown.hide.call(this),
							  (this.state.dropdown.visible = void 0),
							  (this.state.selection = {
									anchorOffset: l.anchorOffset,
									anchorNode: l.anchorNode,
							  }),
							  l.getRangeAt && l.rangeCount && (this.state.selection.range = l.getRangeAt(0)))
			},
			onKeydown: function (t) {
				var e = this,
					i = this.trim(t.target.textContent)
				if (
					(this.trigger('keydown', { originalEvent: this.cloneEvent(t) }),
					'mix' == this.settings.mode)
				) {
					switch (t.key) {
						case 'Left':
						case 'ArrowLeft':
							this.state.actions.ArrowLeft = !0
							break
						case 'Delete':
						case 'Backspace':
							return
					}
					return !0
				}
				switch (t.key) {
					case 'Backspace':
						;(this.state.dropdown.visible && 'manual' != this.settings.dropdown.position) ||
							('' != i && 8203 != i.charCodeAt(0)) ||
							(!0 === this.settings.backspace
								? this.removeTags()
								: 'edit' == this.settings.backspace && setTimeout(this.editTag.bind(this), 0))
						break
					case 'Esc':
					case 'Escape':
						if (this.state.dropdown.visible) return
						t.target.blur()
						break
					case 'Down':
					case 'ArrowDown':
						this.state.dropdown.visible || this.dropdown.show.call(this)
						break
					case 'ArrowRight':
						var s = this.state.inputSuggestion || this.state.ddItemData
						if (s && this.settings.autoComplete.rightKey) return void this.addTags([s], !0)
						break
					case 'Tab':
						if ((i && t.preventDefault(), !i || 'select' == this.settings.mode)) return !0
					case 'Enter':
						if (this.state.dropdown.visible || 229 == t.keyCode) return
						t.preventDefault(),
							setTimeout(function () {
								e.state.actions.selectOption || e.addTags(i, !0)
							})
				}
			},
			onInput: function (t) {
				if ('mix' == this.settings.mode) return this.events.callbacks.onMixTagsInput.call(this, t)
				var e = this.input.normalize.call(this),
					i = e.length >= this.settings.dropdown.enabled,
					s = { value: e, inputElm: this.DOM.input }
				;(s.isValid = this.validateTag({ value: e })),
					this.trigger('input', s),
					this.input.value != e &&
						(this.input.set.call(this, e, !1),
						-1 != e.search(this.settings.delimiters)
							? this.addTags(e) && this.input.set.call(this)
							: this.settings.dropdown.enabled >= 0 &&
							  this.dropdown[i ? 'show' : 'hide'].call(this, e))
			},
			onMixTagsInput: function (t) {
				var e,
					i,
					s,
					a,
					n,
					o,
					r,
					l,
					c,
					h = this,
					g = this.settings,
					u = this.value.length,
					p = this.getTagElms(),
					f = [].map.call(p, function (t) {
						return h.tagData(t).value
					})
				if (
					(this.value.slice().forEach(function (t) {
						t.readonly &&
							!f.includes(t.value) &&
							h.injectAtCaret(h.createTagElem(t), window.getSelection().getRangeAt(0))
					}),
					p.length != u)
				)
					return (
						(this.value = [].map.call(this.getTagElms(), function (t) {
							return t.__tagifyTagData
						})),
						void this.update({ withoutChangeEvent: !0 })
					)
				if (this.hasMaxTags()) return !0
				if (
					window.getSelection &&
					(r = window.getSelection()).rangeCount > 0 &&
					3 == r.anchorNode.nodeType
				) {
					if (
						((e = r.getRangeAt(0).cloneRange()).collapse(!0),
						e.setStart(r.focusNode, 0),
						(a = (i = e.toString().slice(0, e.endOffset)).split(g.pattern).length - 1),
						(s = i.match(g.pattern)) && (n = i.slice(i.lastIndexOf(s[s.length - 1]))),
						n)
					) {
						if (
							((this.state.actions.ArrowLeft = !1),
							(this.state.tag = {
								prefix: n.match(g.pattern)[0],
								value: n.replace(g.pattern, ''),
							}),
							(this.state.tag.baseOffset = r.baseOffset - this.state.tag.value.length),
							(c = this.state.tag.value.match(g.delimiters)))
						)
							return (
								(this.state.tag.value = this.state.tag.value.replace(g.delimiters, '')),
								(this.state.tag.delimiters = c[0]),
								this.addTags(this.state.tag.value, g.dropdown.clearOnSelect),
								void this.dropdown.hide.call(this)
							)
						o = this.state.tag.value.length >= g.dropdown.enabled
						try {
							;(l =
								(l = this.state.flaggedTags[this.state.tag.baseOffset]).prefix ==
									this.state.tag.prefix && l.value[0] == this.state.tag.value[0]),
								this.state.flaggedTags[this.state.tag.baseOffset] &&
									!this.state.tag.value &&
									delete this.state.flaggedTags[this.state.tag.baseOffset]
						} catch (t) {}
						;(l || a < this.state.mixMode.matchedPatternCount) && (o = !1)
					} else this.state.flaggedTags = {}
					this.state.mixMode.matchedPatternCount = a
				}
				setTimeout(function () {
					h.update({ withoutChangeEvent: !0 }),
						h.trigger('input', d({}, h.state.tag, { textContent: h.DOM.input.textContent })),
						h.state.tag && h.dropdown[o ? 'show' : 'hide'].call(h, h.state.tag.value)
				}, 10)
			},
			onInputIE: function (t) {
				var e = this
				setTimeout(function () {
					e.events.callbacks.onInput.call(e, t)
				})
			},
			onClickScope: function (t) {
				var e = t.target.closest('.' + this.settings.classNames.tag),
					i = this.settings,
					s = +new Date() - this.state.hasFocus
				if (t.target != this.DOM.scope) {
					if (!t.target.classList.contains(this.settings.classNames.tagX))
						return e
							? (this.trigger('click', {
									tag: e,
									index: this.getNodeIndex(e),
									data: this.tagData(e),
									originalEvent: this.cloneEvent(t),
							  }),
							  void (
									1 == this.settings.editTags &&
									this.events.callbacks.onDoubleClickScope.call(this, t)
							  ))
							: void (t.target == this.DOM.input &&
							  ('mix' == i.mode && this.fixFirefoxLastTagNoCaret(), s > 500)
									? this.state.dropdown.visible
										? this.dropdown.hide.call(this)
										: 0 === i.dropdown.enabled &&
										  'mix' != i.mode &&
										  this.dropdown.show.call(this)
									: 'select' == i.mode &&
									  !this.state.dropdown.visible &&
									  this.dropdown.show.call(this))
					this.removeTags(t.target.parentNode)
				} else this.state.hasFocus || this.DOM.input.focus()
			},
			onPaste: function (t) {
				var e
				t.preventDefault(),
					(e = (t.clipboardData || window.clipboardData).getData('Text')),
					'mix' == this.settings.mode
						? this.injectAtCaret(e, window.getSelection().getRangeAt(0))
						: this.addTags(e)
			},
			onEditTagInput: function (t, e) {
				var i = t.closest('.' + this.settings.classNames.tag),
					s = this.getNodeIndex(i),
					a = this.tagData(i),
					n = this.input.normalize.call(this, t),
					o = n != a.__originalData.value,
					r = this.validateTag({ value: n })
				o || !0 !== t.originalIsValid || (r = !0),
					i.classList.toggle(this.settings.classNames.tagInvalid, !0 !== r),
					(a.__isValid = r),
					(i.title = !0 === r ? a.title || a.value : r),
					n.length >= this.settings.dropdown.enabled &&
						((this.state.editing.value = n), this.dropdown.show.call(this, n)),
					this.trigger('edit:input', {
						tag: i,
						index: s,
						data: d({}, this.value[s], { newValue: n }),
						originalEvent: this.cloneEvent(e),
					})
			},
			onEditTagFocus: function (t) {
				this.state.editing = { scope: t, input: t.querySelector('[contenteditable]') }
			},
			onEditTagBlur: function (t) {
				if ((this.state.hasFocus || this.toggleFocusClass(), this.DOM.scope.contains(t))) {
					var e = t.closest('.' + this.settings.classNames.tag),
						i = this.input.normalize.call(this, t),
						s = i,
						a = d({}, this.tagData(e), { value: s }),
						n = s != a.__originalData.value,
						o = this.validateTag(a)
					if (!i) return this.removeTags(e), void this.onEditTagDone(null, a)
					n
						? (this.settings.transformTag.call(this, a),
						  !0 === (o = this.validateTag(a))
								? ((a = this.getWhitelistItemByValue(s) || a.__preInvalidData || {}),
								  (a = Object.assign({}, a, { value: s })),
								  this.settings.transformTag.call(this, a),
								  this.onEditTagDone(e, a))
								: this.trigger('invalid', { data: a, tag: e, message: o }))
						: this.onEditTagDone(e, a.__originalData)
				}
			},
			onEditTagkeydown: function (t, e) {
				switch ((this.trigger('edit:keydown', { originalEvent: this.cloneEvent(t) }), t.key)) {
					case 'Esc':
					case 'Escape':
						t.target.textContent = e.__tagifyTagData.__originalData.value
					case 'Enter':
					case 'Tab':
						t.preventDefault(), t.target.blur()
				}
			},
			onDoubleClickScope: function (t) {
				var e,
					i,
					s = t.target.closest('.' + this.settings.classNames.tag),
					a = this.settings
				s &&
					((e = s.classList.contains(this.settings.classNames.tagEditing)),
					(i = s.hasAttribute('readonly')),
					'select' == a.mode || a.readonly || e || i || !this.settings.editTags || this.editTag(s),
					this.toggleFocusClass(!0),
					this.trigger('dblclick', { tag: s, index: this.getNodeIndex(s), data: this.tagData(s) }))
			},
		},
	}
	function p(t, e) {
		return t.previousElementSibling && t.previousElementSibling.classList.contains('tagify')
			? (console.warn('Tagify: ', 'input element is already Tagified', t), this)
			: t
			? ((this.isFirefox = 'undefined' != typeof InstallTrigger),
			  (this.isIE = window.document.documentMode),
			  this.applySettings(t, e || {}),
			  (this.state = { editing: !1, actions: {}, mixMode: {}, dropdown: {}, flaggedTags: {} }),
			  (this.value = []),
			  (this.listeners = {}),
			  (this.DOM = {}),
			  d(this, new this.EventDispatcher(this)),
			  this.build(t),
			  this.getCSSVars(),
			  this.loadOriginalValues(),
			  this.events.customBinding.call(this),
			  this.events.binding.call(this),
			  void (t.autofocus && this.DOM.input.focus()))
			: (console.warn('Tagify: ', 'invalid input element ', t), this)
	}
	return (
		(p.prototype = {
			dropdown: h,
			TEXTS: {
				empty: 'empty',
				exceed: 'number of tags exceeded',
				pattern: 'pattern mismatch',
				duplicate: 'already exists',
				notAllowed: 'not allowed',
			},
			DEFAULTS: g,
			customEventsList: [
				'change',
				'add',
				'remove',
				'invalid',
				'input',
				'click',
				'keydown',
				'focus',
				'blur',
				'edit:input',
				'edit:updated',
				'edit:start',
				'edit:keydown',
				'dropdown:show',
				'dropdown:hide',
				'dropdown:select',
				'dropdown:updated',
				'dropdown:noMatch',
			],
			trim: function (t) {
				return this.settings.trim ? t.trim() : t
			},
			parseHTML: function (t) {
				return new DOMParser().parseFromString(t.trim(), 'text/html').body.firstElementChild
			},
			templates: {
				wrapper: function (t, e) {
					return '<tags class="'
						.concat(e.classNames.namespace, ' ')
						.concat(e.mode ? ''.concat(e.classNames.namespace, '--').concat(e.mode) : '', ' ')
						.concat(t.className, '"\n                    ')
						.concat(e.readonly ? 'readonly' : '', '\n                    ')
						.concat(
							e.required ? 'required' : '',
							'\n                    tabIndex="-1">\n            <span '
						)
						.concat(e.readonly && 'mix' == e.mode ? '' : 'contenteditable', ' data-placeholder="')
						.concat(e.placeholder || '&#8203;', '" aria-placeholder="')
						.concat(e.placeholder || '', '"\n                class="')
						.concat(
							e.classNames.input,
							'"\n                role="textbox"\n                aria-autocomplete="both"\n                aria-multiline="'
						)
						.concat('mix' == e.mode, '"></span>\n        </tags>')
				},
				tag: function (t) {
					return '<tag title="'
						.concat(
							t.title || t.value,
							'"\n                    contenteditable=\'false\'\n                    spellcheck=\'false\'\n                    tabIndex="-1"\n                    class="'
						)
						.concat(this.settings.classNames.tag, ' ')
						.concat(t.class ? t.class : '', '"\n                    ')
						.concat(this.getAttributes(t), ">\n            <x title='' class=\"")
						.concat(
							this.settings.classNames.tagX,
							"\" role='button' aria-label='remove tag'></x>\n            <div>\n                <span class=\""
						)
						.concat(this.settings.classNames.tagText, '">')
						.concat(
							t[this.settings.tagTextProp] || t.value,
							'</span>\n            </div>\n        </tag>'
						)
				},
				dropdown: function (t) {
					var e = t.dropdown,
						i = 'manual' == e.position,
						s = ''.concat(t.classNames.dropdown)
					return '<div class="'
						.concat(i ? '' : s, ' ')
						.concat(
							e.classname,
							'" role="listbox" aria-labelledby="dropdown">\n                    <div class="'
						)
						.concat(t.classNames.dropdownWrapper, '"></div>\n                </div>')
				},
				dropdownItem: function (t) {
					return '<div '
						.concat(this.getAttributes(t), "\n                    class='")
						.concat(this.settings.classNames.dropdownItem, ' ')
						.concat(
							t.class ? t.class : '',
							'\'\n                    tabindex="0"\n                    role="option">'
						)
						.concat(t.value, '</div>')
				},
				dropdownItemNoMatch: null,
			},
			parseTemplate: function (t, e) {
				return (t = this.settings.templates[t] || t), this.parseHTML(t.apply(this, e))
			},
			applySettings: function (t, e) {
				this.DEFAULTS.templates = this.templates
				var i = (this.settings = d({}, this.DEFAULTS, e))
				if (
					((i.readonly = t.hasAttribute('readonly')),
					(i.placeholder = t.getAttribute('placeholder') || i.placeholder || ''),
					(i.required = t.hasAttribute('required')),
					this.isIE && (i.autoComplete = !1),
					['whitelist', 'blacklist'].forEach(function (e) {
						var s = t.getAttribute('data-' + e)
						s && (s = s.split(i.delimiters)) instanceof Array && (i[e] = s)
					}),
					'autoComplete' in e &&
						!r(e.autoComplete) &&
						((i.autoComplete = this.DEFAULTS.autoComplete),
						(i.autoComplete.enabled = e.autoComplete)),
					'mix' == i.mode &&
						((i.autoComplete.rightKey = !0), (i.delimiters = e.delimiters || null)),
					t.pattern)
				)
					try {
						i.pattern = new RegExp(t.pattern)
					} catch (t) {}
				if (this.settings.delimiters)
					try {
						i.delimiters = new RegExp(this.settings.delimiters, 'g')
					} catch (t) {}
				'select' == i.mode && (i.dropdown.enabled = 0),
					(i.dropdown.appendTarget =
						e.dropdown && e.dropdown.appendTarget ? e.dropdown.appendTarget : document.body)
			},
			getAttributes: function (t) {
				if ('[object Object]' != Object.prototype.toString.call(t)) return ''
				var e,
					i,
					s = Object.keys(t),
					a = ''
				for (i = s.length; i--; )
					'class' != (e = s[i]) &&
						t.hasOwnProperty(e) &&
						void 0 !== t[e] &&
						(a += ' ' + e + (void 0 !== t[e] ? '="'.concat(t[e], '"') : ''))
				return a
			},
			getCaretGlobalPosition: function () {
				var t = document.getSelection()
				if (t.rangeCount) {
					var e,
						i,
						s = t.getRangeAt(0),
						a = s.startContainer,
						n = s.startOffset
					if (n > 0)
						return (
							(i = document.createRange()).setStart(a, n - 1),
							i.setEnd(a, n),
							{ left: (e = i.getBoundingClientRect()).right, top: e.top, bottom: e.bottom }
						)
					if (a.getBoundingClientRect) return a.getBoundingClientRect()
				}
				return { left: -9999, top: -9999 }
			},
			getCSSVars: function () {
				var t,
					e = getComputedStyle(this.DOM.scope, null)
				this.CSSVars = {
					tagHideTransition: (function (t) {
						var e = t.value
						return 's' == t.unit ? 1e3 * e : e
					})(
						(function (t) {
							if (!t) return {}
							var e = (t = t.trim().split(' ')[0])
								.split(/\d+/g)
								.filter(function (t) {
									return t
								})
								.pop()
								.trim()
							return {
								value: +t
									.split(e)
									.filter(function (t) {
										return t
									})[0]
									.trim(),
								unit: e,
							}
						})(((t = 'tag-hide-transition'), e.getPropertyValue('--' + t)))
					),
				}
			},
			build: function (t) {
				var e = this.DOM
				this.settings.mixMode.integrated
					? ((e.originalInput = null), (e.scope = t), (e.input = t))
					: ((e.originalInput = t),
					  (e.scope = this.parseTemplate('wrapper', [t, this.settings])),
					  (e.input = e.scope.querySelector('.' + this.settings.classNames.input)),
					  t.parentNode.insertBefore(e.scope, t)),
					this.settings.dropdown.enabled >= 0 && this.dropdown.init.call(this)
			},
			destroy: function () {
				this.DOM.scope.parentNode.removeChild(this.DOM.scope),
					this.dropdown.hide.call(this, !0),
					clearTimeout(this.dropdownHide__bindEventsTimeout)
			},
			loadOriginalValues: function (t) {
				var e,
					i = this.settings
				if (
					(t =
						t || i.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value)
				)
					if ((this.removeAllTags(), 'mix' == i.mode))
						this.parseMixTags(t.trim()),
							((e = this.DOM.input.lastChild) && 'BR' == e.tagName) ||
								this.DOM.input.insertAdjacentHTML('beforeend', '<br>')
					else {
						try {
							JSON.parse(t) instanceof Array && (t = JSON.parse(t))
						} catch (t) {}
						this.addTags(t).forEach(function (t) {
							return t && t.classList.add(i.classNames.tagNoAnimation)
						})
					}
				else this.postUpdate()
				;(this.state.lastOriginalValueReported = i.mixMode.integrated
					? ''
					: this.DOM.originalInput.value),
					(this.state.loadedOriginalValues = !0)
			},
			cloneEvent: function (t) {
				var e = {}
				for (var i in t) e[i] = t[i]
				return e
			},
			EventDispatcher: function (e) {
				var i = document.createTextNode('')
				function s(t, e, s) {
					s &&
						e.split(/\s+/g).forEach(function (e) {
							return i[t + 'EventListener'].call(i, e, s)
						})
				}
				;(this.off = function (t, e) {
					return s('remove', t, e), this
				}),
					(this.on = function (t, e) {
						return e && 'function' == typeof e && s('add', t, e), this
					}),
					(this.trigger = function (s, a) {
						var n
						if (s)
							if (e.settings.isJQueryPlugin)
								'remove' == s && (s = 'removeTag'),
									jQuery(e.DOM.originalInput).triggerHandler(s, [a])
							else {
								try {
									var o = d({}, 'object' === t(a) ? a : { value: a })
									if (((o.tagify = this), a instanceof Object))
										for (var r in a) a[r] instanceof HTMLElement && (o[r] = a[r])
									n = new CustomEvent(s, { detail: o })
								} catch (t) {
									console.warn(t)
								}
								i.dispatchEvent(n)
							}
					})
			},
			loading: function (t) {
				return (
					(this.state.isLoading = t),
					this.DOM.scope.classList[t ? 'add' : 'remove'](this.settings.classNames.scopeLoading),
					this
				)
			},
			tagLoading: function (t, e) {
				return t && t.classList[e ? 'add' : 'remove'](this.settings.classNames.tagLoading), this
			},
			toggleFocusClass: function (t) {
				this.DOM.scope.classList.toggle(this.settings.classNames.focus, !!t)
			},
			triggerChangeEvent: function () {
				if (!this.settings.mixMode.integrated) {
					var t = this.DOM.originalInput,
						e = this.state.lastOriginalValueReported !== t.value,
						i = new CustomEvent('change', { bubbles: !0 })
					e &&
						((this.state.lastOriginalValueReported = t.value),
						(i.simulated = !0),
						t._valueTracker && t._valueTracker.setValue(Math.random()),
						t.dispatchEvent(i),
						this.trigger('change', this.state.lastOriginalValueReported),
						(t.value = this.state.lastOriginalValueReported))
				}
			},
			events: u,
			fixFirefoxLastTagNoCaret: function () {
				var t = this.DOM.input
				if (this.isFirefox && t.childNodes.length && 1 == t.lastChild.nodeType)
					return t.appendChild(document.createTextNode('​')), this.setRangeAtStartEnd(!0), !0
			},
			placeCaretAfterNode: function (t) {
				var e = t.nextSibling,
					i = window.getSelection(),
					s = i.getRangeAt(0)
				i.rangeCount &&
					(s.setStartBefore(e || t), s.setEndBefore(e || t), i.removeAllRanges(), i.addRange(s))
			},
			insertAfterTag: function (t, e) {
				if (((e = e || this.settings.mixMode.insertAfterTag), t && e))
					return (
						(e = 'string' == typeof e ? document.createTextNode(e) : e),
						t.appendChild(e),
						t.parentNode.insertBefore(e, t.nextSibling),
						e
					)
			},
			editTag: function (t, e) {
				var i = this
				;(t = t || this.getLastTag()), (e = e || {}), this.dropdown.hide.call(this)
				var s = t.querySelector('.' + this.settings.classNames.tagText),
					a = this.getNodeIndex(t),
					n = t.__tagifyTagData,
					o = this.events.callbacks,
					r = this,
					l = !0
				if (s) {
					if (!(n instanceof Object && 'editable' in n) || n.editable)
						return (
							(t.__tagifyTagData.__originalData = d({}, n)),
							t.classList.add(this.settings.classNames.tagEditing),
							s.setAttribute('contenteditable', !0),
							s.addEventListener('focus', o.onEditTagFocus.bind(this, t)),
							s.addEventListener('blur', function () {
								setTimeout(o.onEditTagBlur.bind(r), 0, s)
							}),
							s.addEventListener('input', o.onEditTagInput.bind(this, s)),
							s.addEventListener('keydown', function (e) {
								return o.onEditTagkeydown.call(i, e, t)
							}),
							s.focus(),
							this.setRangeAtStartEnd(!1, s),
							e.skipValidation || (l = this.editTagToggleValidity(t, n.value)),
							(s.originalIsValid = l),
							this.trigger('edit:start', { tag: t, index: a, data: n, isValid: l }),
							this
						)
				} else
					console.warn('Cannot find element in Tag template: .', this.settings.classNames.tagText)
			},
			editTagToggleValidity: function (t, e) {
				var i,
					s = t.__tagifyTagData
				if (s)
					return (
						(i = !(!s.__isValid || 1 == s.__isValid)),
						t.classList.toggle(this.settings.classNames.tagInvalid, i),
						s.__isValid
					)
				console.warn('tag has no data: ', t, s)
			},
			onEditTagDone: function (t, e) {
				;(this.state.editing = !1), (e = e || {})
				var i = { tag: t, index: this.getNodeIndex(t), data: e }
				this.trigger('edit:beforeUpdate', i),
					delete e.__originalData,
					t && (this.editTagToggleValidity(t), this.replaceTag(t, e)),
					this.trigger('edit:updated', i),
					this.dropdown.hide.call(this),
					this.settings.keepInvalidTags && this.reCheckInvalidTags()
			},
			replaceTag: function (t, e) {
				;(e && e.value) || (e = t.__tagifyTagData),
					e.__isValid && 1 != e.__isValid && d(e, this.getInvalidTagParams(e, e.__isValid))
				var i = this.createTagElem(e)
				t.parentNode.replaceChild(i, t), this.updateValueByDOMTags()
			},
			updateValueByDOMTags: function () {
				var t = this
				;(this.value.length = 0),
					[].forEach.call(this.getTagElms(), function (e) {
						e.classList.contains(t.settings.classNames.tagNotAllowed) ||
							t.value.push(t.tagData(e))
					}),
					this.update()
			},
			setRangeAtStartEnd: function (t, e) {
				;(t = 'number' == typeof t ? t : !!t), (e = (e = e || this.DOM.input).lastChild || e)
				var i = document.getSelection()
				try {
					i.rangeCount >= 1 &&
						['Start', 'End'].forEach(function (s) {
							return i.getRangeAt(0)['set' + s](e, t || e.length)
						})
				} catch (t) {
					console.warn('Tagify: ', t)
				}
			},
			injectAtCaret: function (t, e) {
				if ((e = e || this.state.selection.range))
					return (
						'string' == typeof t && (t = document.createTextNode(t)),
						e.deleteContents(),
						e.insertNode(t),
						this.setRangeAtStartEnd(!1, t),
						this.updateValueByDOMTags(),
						this.update(),
						this
					)
			},
			input: {
				value: '',
				set: function () {
					var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
						e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
						i = this.settings.dropdown.closeOnSelect
					;(this.input.value = t),
						e && (this.DOM.input.innerHTML = t),
						!t && i && this.dropdown.hide.bind(this),
						this.input.autocomplete.suggest.call(this),
						this.input.validate.call(this)
				},
				validate: function () {
					var t = !this.input.value || !0 === this.validateTag({ value: this.input.value })
					return this.DOM.input.classList.toggle(this.settings.classNames.inputInvalid, !t), t
				},
				normalize: function (t) {
					var e = t || this.DOM.input,
						i = []
					e.childNodes.forEach(function (t) {
						return 3 == t.nodeType && i.push(t.nodeValue)
					}),
						(i = i.join('\n'))
					try {
						i = i.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(0))
					} catch (t) {}
					return (i = i.replace(/\s/g, ' ')), this.settings.trim && (i = i.replace(/^\s+/, '')), i
				},
				autocomplete: {
					suggest: function (t) {
						if (this.settings.autoComplete.enabled) {
							'string' == typeof (t = t || {}) && (t = { value: t })
							var e = t.value ? '' + t.value : '',
								i = e.substr(0, this.input.value.length).toLowerCase(),
								s = e.substring(this.input.value.length)
							e && this.input.value && i == this.input.value.toLowerCase()
								? (this.DOM.input.setAttribute('data-suggest', s),
								  (this.state.inputSuggestion = t))
								: (this.DOM.input.removeAttribute('data-suggest'),
								  delete this.state.inputSuggestion)
						}
					},
					set: function (t) {
						var e = this.DOM.input.getAttribute('data-suggest'),
							i = t || (e ? this.input.value + e : null)
						return (
							!!i &&
							('mix' == this.settings.mode
								? this.replaceTextWithNode(document.createTextNode(this.state.tag.prefix + i))
								: (this.input.set.call(this, i), this.setRangeAtStartEnd()),
							this.input.autocomplete.suggest.call(this),
							this.dropdown.hide.call(this),
							!0)
						)
					},
				},
			},
			getTagIdx: function (t) {
				return this.value.findIndex(function (e) {
					return JSON.stringify(e) == JSON.stringify(t)
				})
			},
			getNodeIndex: function (t) {
				var e = 0
				if (t) for (; (t = t.previousElementSibling); ) e++
				return e
			},
			getTagElms: function () {
				for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i]
				var s = ['.' + this.settings.classNames.tag].concat(e).join('.')
				return this.DOM.scope.querySelectorAll(s)
			},
			getLastTag: function () {
				var t = this.DOM.scope.querySelectorAll(
					'.'
						.concat(this.settings.classNames.tag, ':not(.')
						.concat(this.settings.classNames.tagHide, '):not([readonly])')
				)
				return t[t.length - 1]
			},
			tagData: function (t, e) {
				return t
					? (e && (t.__tagifyTagData = d({}, t.__tagifyTagData || {}, e)), t.__tagifyTagData)
					: (console.warn("tag elment doesn't exist", t, e), e)
			},
			isTagDuplicate: function (t, e) {
				var i = this,
					s = this.settings
				return (
					'select' != s.mode &&
					this.value.reduce(function (a, n) {
						return o(i.trim('' + t), n.value, e || s.dropdown.caseSensitive) ? a + 1 : a
					}, 0)
				)
			},
			getTagIndexByValue: function (t) {
				var e = this,
					i = []
				return (
					this.getTagElms().forEach(function (s, a) {
						o(e.trim(s.textContent), t, e.settings.dropdown.caseSensitive) && i.push(a)
					}),
					i
				)
			},
			getTagElmByValue: function (t) {
				var e = this.getTagIndexByValue(t)[0]
				return this.getTagElms()[e]
			},
			flashTag: function (t) {
				var e = this
				t &&
					(t.classList.add(this.settings.classNames.tagFlash),
					setTimeout(function () {
						t.classList.remove(e.settings.classNames.tagFlash)
					}, 100))
			},
			isTagBlacklisted: function (t) {
				return (
					(t = this.trim(t.toLowerCase())),
					this.settings.blacklist.filter(function (e) {
						return ('' + e).toLowerCase() == t
					}).length
				)
			},
			isTagWhitelisted: function (t) {
				var e = this
				return this.settings.whitelist.some(function (i) {
					return 'string' == typeof t
						? o(e.trim(t), i.value || i)
						: o(JSON.stringify(i), JSON.stringify(t))
				})
			},
			validateTag: function (t) {
				var e = this.trim(t.value),
					i = this.settings
				return t.value.trim()
					? i.pattern && i.pattern instanceof RegExp && !i.pattern.test(e)
						? this.TEXTS.pattern
						: !i.duplicates && this.isTagDuplicate(e, this.state.editing)
						? this.TEXTS.duplicate
						: !(this.isTagBlacklisted(e) || (i.enforceWhitelist && !this.isTagWhitelisted(e))) ||
						  this.TEXTS.notAllowed
					: this.TEXTS.empty
			},
			getInvalidTagParams: function (t, e) {
				return {
					'aria-invalid': !0,
					class: ''
						.concat(t.class || '', ' ')
						.concat(this.settings.classNames.tagNotAllowed)
						.trim(),
					title: e,
				}
			},
			hasMaxTags: function () {
				return this.value.length >= this.settings.maxTags && this.TEXTS.exceed
			},
			normalizeTags: function (t) {
				var e = this,
					i = this.settings,
					n = i.whitelist,
					o = i.delimiters,
					r = i.mode,
					l = !!n && n[0] instanceof Object,
					d = t instanceof Array,
					c = [],
					h = function (t) {
						return (t + '')
							.split(o)
							.filter(function (t) {
								return t
							})
							.map(function (t) {
								return { value: e.trim(t) }
							})
					}
				if (('number' == typeof t && (t = t.toString()), 'string' == typeof t)) {
					if (!t.trim()) return []
					t = h(t)
				} else if (d) {
					var g
					t = (g = []).concat.apply(
						g,
						a(
							t.map(function (t) {
								return t.value
									? h(t.value).map(function (e) {
											return s(s({}, t), e)
									  })
									: h(t)
							})
						)
					)
				}
				return (
					l &&
						(t.forEach(function (t) {
							var i = e.getWhitelistItemByValue(t.value)
							i && i instanceof Object ? c.push(i) : 'mix' != r && c.push(t)
						}),
						c.length && (t = c)),
					t
				)
			},
			getWhitelistItemByValue: function (t) {
				var e,
					i = this.settings
				return (
					i.whitelist.some(function (s) {
						if (o('string' == typeof s ? s : s.value, t, i.dropdown.caseSensitive))
							return (e = 'string' == typeof s ? { value: s } : s), !0
					}),
					e
				)
			},
			parseMixTags: function (t) {
				var e = this,
					i = this.settings,
					s = i.mixTagsInterpolator,
					a = i.duplicates,
					n = i.transformTag,
					o = i.enforceWhitelist,
					r = i.maxTags,
					l = []
				return (
					(t = t
						.split(s[0])
						.map(function (t, i) {
							var d,
								c,
								h = t.split(s[1]),
								g = h[0],
								u = l.length == r
							try {
								if (g == +g) throw Error
								d = JSON.parse(g)
							} catch (t) {
								d = e.normalizeTags(g)[0]
							}
							if (
								u ||
								!(h.length > 1) ||
								(o && !e.isTagWhitelisted(d.value)) ||
								(!a && e.isTagDuplicate(d.value))
							) {
								if (t) return i ? s[0] + t : t
							} else n.call(e, d), (c = e.createTagElem(d)), l.push(d), c.classList.add(e.settings.classNames.tagNoAnimation), (h[0] = c.outerHTML), e.value.push(d)
							return h.join('')
						})
						.join('')),
					(this.DOM.input.innerHTML = t),
					this.DOM.input.appendChild(document.createTextNode('')),
					this.DOM.input.normalize(),
					this.getTagElms().forEach(function (t, i) {
						return e.tagData(t, l[i])
					}),
					this.update({ withoutChangeEvent: !0 }),
					t
				)
			},
			replaceTextWithNode: function (t, e) {
				if (this.state.tag || e) {
					e = e || this.state.tag.prefix + this.state.tag.value
					var i,
						s,
						a = window.getSelection(),
						n = a.anchorNode,
						o = this.state.tag.delimiters ? this.state.tag.delimiters.length : 0
					return (
						n.splitText(a.anchorOffset - o),
						(i = n.nodeValue.lastIndexOf(e)),
						(s = n.splitText(i)),
						t && n.parentNode.replaceChild(t, s),
						!0
					)
				}
			},
			selectTag: function (t, e) {
				if (!this.settings.enforceWhitelist || this.isTagWhitelisted(e.value))
					return (
						this.input.set.call(this, e.value, !0),
						this.state.actions.selectOption && setTimeout(this.setRangeAtStartEnd.bind(this)),
						this.getLastTag() ? this.replaceTag(this.getLastTag(), e) : this.appendTag(t),
						(this.value[0] = e),
						this.trigger('add', { tag: t, data: e }),
						this.update(),
						[t]
					)
			},
			addEmptyTag: function () {
				var t = { value: '' },
					e = this.createTagElem(t)
				this.tagData(e, t), this.appendTag(e), this.editTag(e, { skipValidation: !0 })
			},
			addTags: function (t, e) {
				var i = this,
					s =
						arguments.length > 2 && void 0 !== arguments[2]
							? arguments[2]
							: this.settings.skipInvalid,
					a = [],
					n = this.settings
				return t && 0 != t.length
					? ((t = this.normalizeTags(t)),
					  'mix' == n.mode
							? this.addMixTags(t)
							: ('select' == n.mode && (e = !1),
							  this.DOM.input.removeAttribute('style'),
							  t.forEach(function (t) {
									var e,
										o = {},
										r = Object.assign({}, t, { value: t.value + '' })
									if (
										(((t = Object.assign({}, r)).__isValid =
											i.hasMaxTags() || i.validateTag(t)),
										n.transformTag.call(i, t),
										!0 !== t.__isValid)
									) {
										if (s) return
										d(o, i.getInvalidTagParams(t, t.__isValid), { __preInvalidData: r }),
											t.__isValid == i.TEXTS.duplicate &&
												i.flashTag(i.getTagElmByValue(t.value))
									}
									if (
										(t.readonly && (o['aria-readonly'] = !0),
										(e = i.createTagElem(d({}, t, o))),
										a.push(e),
										'select' == n.mode)
									)
										return i.selectTag(e, t)
									i.appendTag(e),
										t.__isValid && !0 === t.__isValid
											? (i.value.push(t),
											  i.update(),
											  i.trigger('add', {
													tag: e,
													index: i.value.length - 1,
													data: t,
											  }))
											: (i.trigger('invalid', {
													data: t,
													index: i.value.length,
													tag: e,
													message: t.__isValid,
											  }),
											  n.keepInvalidTags ||
													setTimeout(function () {
														return i.removeTags(e, !0)
													}, 1e3)),
										i.dropdown.position.call(i)
							  }),
							  t.length && e && this.input.set.call(this),
							  this.dropdown.refilter.call(this),
							  a))
					: ('select' == n.mode && this.removeAllTags(), a)
			},
			addMixTags: function (t) {
				var e,
					i = this,
					s = this.settings,
					a = this.state.tag.delimiters
				return (
					s.transformTag.call(this, t[0]),
					(t[0].prefix =
						t[0].prefix || this.state.tag
							? this.state.tag.prefix
							: (s.pattern.source || s.pattern)[0]),
					(e = this.createTagElem(t[0])),
					this.replaceTextWithNode(e) || this.DOM.input.appendChild(e),
					setTimeout(function () {
						return e.classList.add(i.settings.classNames.tagNoAnimation)
					}, 300),
					this.value.push(t[0]),
					this.update(),
					!a &&
						setTimeout(
							function () {
								var t = i.insertAfterTag(e) || e
								i.placeCaretAfterNode(t)
							},
							this.isFirefox ? 100 : 0
						),
					(this.state.tag = null),
					this.trigger('add', d({}, { tag: e }, { data: t[0] })),
					e
				)
			},
			appendTag: function (t) {
				var e = this.DOM.scope.lastElementChild
				e === this.DOM.input ? this.DOM.scope.insertBefore(t, e) : this.DOM.scope.appendChild(t)
			},
			createTagElem: function (t) {
				var e,
					i = d({}, t, { value: l(t.value + '') })
				return (
					this.settings.readonly && (t.readonly = !0),
					(e = this.parseTemplate('tag', [i])),
					this.tagData(e, t),
					e
				)
			},
			reCheckInvalidTags: function () {
				var t = this,
					e = this.settings,
					i = '.'.concat(e.classNames.tag, '.').concat(e.classNames.tagNotAllowed),
					s = this.DOM.scope.querySelectorAll(i)
				;[].forEach.call(s, function (e) {
					var i = t.tagData(e),
						s = e.getAttribute('title') == t.TEXTS.duplicate,
						a = !0 === t.validateTag(i)
					s &&
						a &&
						((i = i.__preInvalidData ? i.__preInvalidData : { value: i.value }),
						t.replaceTag(e, i))
				})
			},
			removeTags: function (t, e, i) {
				var s,
					a = this
				;(t =
					t && t instanceof HTMLElement
						? [t]
						: t instanceof Array
						? t
						: t
						? [t]
						: [this.getLastTag()]),
					(s = t.reduce(function (t, e) {
						return (
							e && 'string' == typeof e && (e = a.getTagElmByValue(e)),
							e &&
								t.push({
									node: e,
									idx: a.getTagIdx(a.tagData(e)),
									data: a.tagData(e, { __removed: !0 }),
								}),
							t
						)
					}, [])),
					(i = 'number' == typeof i ? i : this.CSSVars.tagHideTransition),
					'select' == this.settings.mode && ((i = 0), this.input.set.call(this)),
					1 == s.length &&
						s[0].node.classList.contains(this.settings.classNames.tagNotAllowed) &&
						(e = !0),
					s.length &&
						this.settings.hooks
							.beforeRemoveTag(s, { tagify: this })
							.then(function () {
								function t(t) {
									t.node.parentNode &&
										(t.node.parentNode.removeChild(t.node),
										e
											? this.settings.keepInvalidTags &&
											  this.trigger('remove', { tag: t.node, index: t.idx })
											: (this.trigger('remove', {
													tag: t.node,
													index: t.idx,
													data: t.data,
											  }),
											  this.dropdown.refilter.call(this),
											  this.dropdown.position.call(this),
											  this.DOM.input.normalize(),
											  this.settings.keepInvalidTags && this.reCheckInvalidTags()))
								}
								i && i > 10 && 1 == s.length
									? function (e) {
											;(e.node.style.width =
												parseFloat(window.getComputedStyle(e.node).width) + 'px'),
												document.body.clientTop,
												e.node.classList.add(this.settings.classNames.tagHide),
												setTimeout(t.bind(this), i, e)
									  }.call(a, s[0])
									: s.forEach(t.bind(a)),
									e ||
										(s.forEach(function (t) {
											var e = Object.assign({}, t.data)
											delete e.__removed
											var i = a.getTagIdx(e)
											i > -1 && a.value.splice(i, 1)
										}),
										a.update())
							})
							.catch(function (t) {})
			},
			removeAllTags: function () {
				;(this.value = []),
					'mix' == this.settings.mode
						? (this.DOM.input.innerHTML = '')
						: Array.prototype.slice.call(this.getTagElms()).forEach(function (t) {
								return t.parentNode.removeChild(t)
						  }),
					this.dropdown.position.call(this),
					'select' == this.settings.mode && this.input.set.call(this),
					this.update()
			},
			postUpdate: function () {
				var t = this.settings.classNames,
					e =
						'mix' == this.settings.mode
							? this.settings.mixMode.integrated
								? this.DOM.input.textContent
								: this.DOM.originalInput.value
							: this.value.length
				this.DOM.scope.classList.toggle(t.hasMaxTags, this.value.length >= this.settings.maxTags),
					this.DOM.scope.classList.toggle(t.hasNoTags, !this.value.length),
					this.DOM.scope.classList.toggle(t.empty, !e)
			},
			update: function (t) {
				var e,
					i,
					s = this.DOM.originalInput,
					a = (t || {}).withoutChangeEvent,
					n =
						((e = this.value),
						(i = ['__isValid', '__removed']),
						e.map(function (t) {
							var e = {}
							for (var s in t) i.indexOf(s) < 0 && (e[s] = t[s])
							return e
						}))
				this.settings.mixMode.integrated ||
					(s.value =
						'mix' == this.settings.mode
							? this.getMixedTagsAsString(n)
							: n.length
							? this.settings.originalInputValueFormat
								? this.settings.originalInputValueFormat(n)
								: JSON.stringify(n)
							: ''),
					this.postUpdate(),
					!a && this.state.loadedOriginalValues && this.triggerChangeEvent()
			},
			getMixedTagsAsString: function () {
				var t = '',
					e = this,
					i = this.settings.mixTagsInterpolator
				return (
					(function s(a) {
						a.childNodes.forEach(function (a) {
							if (1 == a.nodeType) {
								if (a.classList.contains(e.settings.classNames.tag) && e.tagData(a)) {
									if (e.tagData(a).__removed) return
									return void (t += i[0] + JSON.stringify(a.__tagifyTagData) + i[1])
								}
								'BR' != a.tagName ||
								(a.parentNode != e.DOM.input && 1 != a.parentNode.childNodes.length)
									? ('DIV' != a.tagName && 'P' != a.tagName) || ((t += '\r\n'), s(a))
									: (t += '\r\n')
							} else t += a.textContent
						})
					})(this.DOM.input),
					t
				)
			},
		}),
		(p.prototype.removeTag = p.prototype.removeTags),
		p
	)
})

// The DOM element you wish to replace with Tagify
var input = document.querySelector('input[name=tags-outside]')

// init Tagify script on the above inputs
    const tagify = new Tagify(input, {
		whitelist: [
			'Vorsätzliche Begehungsdelikte',
			'Tatbestand',
			'Rechtswidrigkeit ',
			'Schuld',
			'Irrtümer',
			'Fahrlässigkeitsdelikte',
			'Täterschaft und Teilnahme',
			'Der Versuch',
			'Unterlassungsdelikte',
			'Konkurrenzen',
			'Vermögensdelikte',
			'Nichtvermögensdelikte',
			'Baurecht',
			'Kommunalrecht',
			'Polizei- und Ordnungsrecht',
			'Versammlungsrecht',
		],
		maxTags: 10,
		dropdown: {
			position: 'input',
			enabled: 0, // always opens dropdown when input gets focus
			maxItems: 20, // <- mixumum allowed rendered suggestions
			classname: 'tags-look', // <- custom classname for this dropdown, so it could be targeted
			closeOnSelect: true, // <- do not hide the suggestions dropdown once an item has been selected
		},
		templates: {
			dropdownItemNoMatch: function (data) {
				return `
                    <span id='search-error'> Keine Empfehlung fur "${data.value}" gefunden, fuege einen neuen Tag hinzu. </span>
                `
			},
		},
	})