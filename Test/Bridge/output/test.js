﻿Bridge.assembly("Test", function ($asm, globals) {
    "use strict";

    Bridge.define("Test.App", {
        $main: function () {
            Test.Form.setup();

            //var butBing = new HTMLButtonElement
            //{
            //	InnerHTML = "Bing",
            //	OnClick = (ev) =>
            //	{
            //		var frm = new FormBrowser();
            //		frm.Left = "50px";
            //		frm.Top = "50px";
            //		frm.Text = "Bing";
            //		frm.Navigate("https://bing.com");
            //		frm.Show();
            //	}
            //};

            //         //var butLel = new HTMLButtonElement
            //         //{
            //         //    InnerHTML = "Lel",
            //         //    OnClick = (ev) =>
            //         //    {
            //         //        var frm = new FormBrowser();
            //         //        frm.Left = "50px";
            //         //        frm.Top = "50px";
            //         //        frm.Text = "Lel";
            //         //        frm.Navigate("file:///C:/Users/Samuel/Desktop/Test/Test/Bridge/www/demo.html");
            //         //        frm.Show();
            //         //    }
            //         //};

            //         var butNote = new HTMLButtonElement
            //{
            //	InnerHTML = "NotePad",
            //	OnClick = (ev) =>
            //	{
            //		var frm = new FormNotePad();
            //		frm.Left = "50px";
            //		frm.Top = "50px";
            //		frm.Text = "Note Pad";
            //		frm.Show();
            //	}
            //};

            //         var butCmd = new HTMLButtonElement
            //         {
            //             InnerHTML = "Command Prompt",
            //             OnClick = (ev) =>
            //             {
            //                 var frm = new FormConsole();
            //                 frm.Left = "50px";
            //                 frm.Top = "50px";
            //                 frm.Text = "Command Prompt";
            //                 frm.Show();
            //             }
            //         };

            //         Form.WindowHolder.AppendChild(butBing);
            //Form.WindowHolder.AppendChild(butNote);	//Form.WindowHolder.AppendChild(butLel);			
            //         Form.WindowHolder.AppendChild(butCmd);
        }
    });

    Bridge.define("Test.FileExplorerNode", {
        statics: {
            createNode: function (path, nvt, parent, IsFile) {
                if (IsFile === void 0) { IsFile = false; }
                var fen = Bridge.merge(new Test.FileExplorerNode(), {
                    setIsFile: IsFile,
                    setnodeViewType: nvt
                } );
                fen.parent = parent;
                fen.setName(Test.Path.getFileName(path));
                fen.setDirectory(Test.Path.getDirectoryName(path));
                fen.setFullPath(path);

                fen.createHtmlNode();

                return fen;
            }
        },
        nodeImage: null,
        nodeText: null,
        nodeState: 0,
        parent: null,
        config: {
            properties: {
                Name: null,
                Directory: null,
                FullPath: null,
                nodeViewType: 0,
                IsFile: false,
                NodeBase: null
            }
        },
        getNodeExplorerState: function () {
            return this.nodeState;
        },
        setNodeExplorerState: function (value) {
            if (this.nodeState !== value) {
                this.nodeState = value;
                if (this.getNodeBase() != null) {
                    this.createHtmlNode();
                }
            }
        },
        createHtmlNode: function () {
            if (this.getNodeBase() == null) {
                this.setNodeBase(document.createElement('div'));
                this.nodeImage = document.createElement('div');
                this.nodeText = document.createElement('span');

                this.getNodeBase().style.zIndex = "0";

                this.getNodeBase().style.position = "absolute";
                this.nodeImage.style.position = "absolute";
                this.nodeText.style.position = "absolute";

                this.getNodeBase().addEventListener("dblclick", Bridge.fn.bind(this, $_.Test.FileExplorerNode.f1));

                this.getNodeBase().addEventListener("mouseup", Bridge.fn.bind(this, $_.Test.FileExplorerNode.f2));

                this.getNodeBase().addEventListener("mousedown", Bridge.fn.bind(this, $_.Test.FileExplorerNode.f3));

                this.getNodeBase().addEventListener("mouseenter", Bridge.fn.bind(this, $_.Test.FileExplorerNode.f4));

                this.getNodeBase().addEventListener("mouseleave", Bridge.fn.bind(this, $_.Test.FileExplorerNode.f5));

                if (this.getnodeViewType() === Test.NodeViewType.Medium_Icons) {
                    $(this.getNodeBase()).css("width", 76).css("height", 70);

                    $(this.nodeImage).css("width", 48).css("height", 48).css("left", 14).css("top", 2);

                    this.getNodeBase().style.borderStyle = "solid";
                    this.getNodeBase().style.borderWidth = "thin";

                    var img = new Image();

                    img.style.maxWidth = "100%";
                    img.style.maxHeight = "100%";

                    img.style.position = "absolute";
                    img.style.display = "block";

                    if (this.getIsFile()) {
                        img.setAttribute("src", Test.FileExplorer.IMAGE_File);
                    } else {
                        img.setAttribute("src", Test.FileExplorer.IMAGE_Folder);
                    } //NodeImage.Style.Background = FileExplorer.IMAGE_Folder;

                    Test.Form.disableStateDrag(img);

                    this.nodeImage.appendChild(img);

                    this.nodeText.innerHTML = this.getName();
                    this.nodeText.style.fontFamily = "Segoe UI";
                    this.nodeText.style.fontSize = "10pt";
                    this.nodeText.style.textAlign = "center";
                    this.nodeText.style.cursor = "default";
                    this.nodeText.style.textShadow = "0px 2px 7px rgba(0, 0, 0, 0.5)";


                    Test.Form.setInternalLabel(this.nodeText);

                    Test.Form.changeStateTextSelection(this.nodeText, false);
                    Test.Form.changeStateTextSelection(this.nodeImage, false);
                    Test.Form.changeStateTextSelection(this.getNodeBase(), false);
                    Test.Form.changeStateTextSelection(img, false);

                    $(this.nodeText).css("width", 74).css("height", 20).css("left", 2).css("top", 48);

                    this.nodeText.style.color = "white";

                    this.getNodeBase().appendChild(this.nodeImage);
                    this.getNodeBase().appendChild(this.nodeText);
                }
            }

            // image 48x48

            switch (this.nodeState) {
                case Test.FileExplorerNode.FileExplorerState.None: 
                    this.getNodeBase().style.backgroundColor = "";
                    this.getNodeBase().style.borderColor = "rgba(255, 255, 255, 0)";
                    break;
                case Test.FileExplorerNode.FileExplorerState.HoverSelected: 
                case Test.FileExplorerNode.FileExplorerState.HoverFocused: 
                case Test.FileExplorerNode.FileExplorerState.Hover: 
                    this.getNodeBase().style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    this.getNodeBase().style.borderColor = "rgba(255, 255, 255, 0.5)";
                    break;
                case Test.FileExplorerNode.FileExplorerState.Selected: 
                case Test.FileExplorerNode.FileExplorerState.Focused: 
                    this.getNodeBase().style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                    this.getNodeBase().style.borderColor = "rgba(255, 255, 255, 0.5)";
                    break;
                default: 
                    break;
            }
        },
        remove: function () {
            if (this.getNodeBase() != null) {
                this.getNodeBase().remove();
            }
        }
    });

    var $_ = {};

    Bridge.ns("Test.FileExplorerNode", $_);

    Bridge.apply($_.Test.FileExplorerNode, {
        f1: function (ev) {
            if (!Test.Form.midleOfAction()) {
                this.parent.clearSelection();

                Test.Process.start(this.getFullPath());
            }
        },
        f2: function (ev) {
            if (!Test.Form.midleOfAction()) {
                // did i drag...
                this.parent.clearSelection(this);
            }
        },
        f3: function (ev) {
            if (!Test.Form.midleOfAction()) {
                var selectionCount = this.parent.getSelectionCount(this);

                if (this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Selected) {
                    if (selectionCount === 0) {
                        this.parent.clearSelection(this);
                    }
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Focused);
                } else {
                    if (selectionCount === 0) {
                        this.parent.clearSelection(this);
                    }
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Focused);
                }
                ev.stopPropagation();
            }
        },
        f4: function (ev) {
            if (!Test.Form.midleOfAction()) {
                if (this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Focused || this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.HoverFocused) {
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.HoverFocused);
                } else if (this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Selected || this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.HoverSelected) {
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.HoverSelected);
                } else {
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Hover);
                }
                ev.stopPropagation();
            }
        },
        f5: function (ev) {
            if (!Test.Form.midleOfAction()) {
                if (this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.HoverFocused || this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Focused) {
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Focused);
                } else if (this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.HoverSelected || this.getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Selected) {
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Selected);
                } else {
                    this.setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.None);
                }
                ev.stopPropagation();
            }
        }
    });

    Bridge.define("Test.FileExplorer", {
        statics: {
            IMAGE_File: "data:image/png;base64,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",
            IMAGE_Folder: "data:image/png;base64,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",
            DesktopPath: "$desktop",
            isDirectoryRequestValue: function (directory) {



                return true;
            }
        },
        path: null,
        element: null,
        loadedNodes: null,
        config: {
            properties: {
                NodeViewType: 0
            },
            init: function () {
                this.loadedNodes = new (System.Collections.Generic.List$1(Test.FileExplorerNode))();
            }
        },
        ctor: function (element) {
            this.$initialize();
            this.element = element;
        },
        getPath: function () {
            return this.path;
        },
        setPath: function (value) {
            if (!Bridge.referenceEquals(this.path, value)) {
                if (Test.FileExplorer.isDirectoryRequestValue(value)) {
                    this.path = value;
                    this.refresh();
                } else {
                    this.warnEnduserOfInvalidRequest();
                }
            }
        },
        warnEnduserOfInvalidRequest: function () {

        },
        clearItems: function () {
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null) {
                    this.loadedNodes.getItem(i).remove();
                }
            }
            this.loadedNodes = new (System.Collections.Generic.List$1(Test.FileExplorerNode))();
        },
        getSelectionCount: function (DontInclude) {
            if (DontInclude === void 0) { DontInclude = null; }
            var x = 0;
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null && !Bridge.referenceEquals(this.loadedNodes.getItem(i), DontInclude)) {
                    var htmlNode = this.loadedNodes.getItem(i).getNodeBase();
                    if (htmlNode != null) {
                        if (this.loadedNodes.getItem(i).getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Selected || this.loadedNodes.getItem(i).getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.HoverSelected) {
                            x = (x + 1) | 0;
                        }
                    }
                }
            }
            return x;
        },
        clearSelection: function (DontInclude) {
            if (DontInclude === void 0) { DontInclude = null; }
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null && !Bridge.referenceEquals(this.loadedNodes.getItem(i), DontInclude)) {
                    var htmlNode = this.loadedNodes.getItem(i).getNodeBase();
                    if (htmlNode != null) {
                        this.loadedNodes.getItem(i).setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.None);
                    }
                }
            }
        },
        setFocus: function (index) {
            this.setFocus$1(this.loadedNodes.getItem(index));
        },
        setFocus$1: function (node) {
            for (var i = 0; i < this.loadedNodes.getCount(); i = (i + 1) | 0) {
                if (this.loadedNodes.getItem(i) != null) {
                    var htmlNode = this.loadedNodes.getItem(i).getNodeBase();
                    if (htmlNode != null) {
                        if (Bridge.referenceEquals(this.loadedNodes.getItem(i), node)) {
                            if (this.loadedNodes.getItem(i).getNodeExplorerState() === Test.FileExplorerNode.FileExplorerState.Hover) {
                                this.loadedNodes.getItem(i).setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.HoverFocused);
                            } else {
                                this.loadedNodes.getItem(i).setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Focused);
                            }
                        } else {
                            this.loadedNodes.getItem(i).setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.None);
                        }

                    }
                }
            }
        },
        refresh: function () {
            if (this.loadedNodes == null) {
                this.loadedNodes = new (System.Collections.Generic.List$1(Test.FileExplorerNode))();
            } else {
                if (this.loadedNodes.getCount() > 0) {
                    this.clearItems();
                }
            }

            var nvt = this.getNodeViewType();
            if (Bridge.referenceEquals(this.getPath(), Test.FileExplorer.DesktopPath)) {
                // load the locations of the desktop items.
                nvt = Test.NodeViewType.Medium_Icons;
            }

            var Files = Test.Directory.getFiles(this.getPath());
            var Folders = Test.Directory.getDirectories(this.getPath());

            for (var i = 0; i < Files.length; i = (i + 1) | 0) {
                this.loadedNodes.add(Test.FileExplorerNode.createNode(Files[i], this.getNodeViewType(), this, true));
            }

            for (var i1 = 0; i1 < Folders.length; i1 = (i1 + 1) | 0) {
                this.loadedNodes.add(Test.FileExplorerNode.createNode(Folders[i1], this.getNodeViewType(), this));
            }

            // get the order type!! #TODO# sort items
            var x = 0;
            var y = 19;

            var j = 0;

            for (var i2 = 0; i2 < this.loadedNodes.getCount(); i2 = (i2 + 1) | 0) {
                if (this.loadedNodes.getItem(i2) != null && this.loadedNodes.getItem(i2).getNodeBase() != null) {
                    $(this.loadedNodes.getItem(i2).getNodeBase()).css("left", x).css("top", y);
                    this.element.appendChild(this.loadedNodes.getItem(i2).getNodeBase());
                    j = (j + 1) | 0;
                    if (j > 10) {
                        x = (x + 76) | 0;
                        y = 0;

                        j = 0;
                    }

                    y = (y + 70) | 0;

                    y = (y + 19) | 0;
                }

            }
        }
    });

    Bridge.define("Test.FileExplorerNode.FileExplorerState", {
        $kind: "enum",
        statics: {
            None: 0,
            Hover: 1,
            Focused: 2,
            Selected: 3,
            HoverFocused: 4,
            HoverSelected: 5
        }
    });

    Bridge.define("Test.Form", {
        statics: {
            movingForm: null,
            parent: null,
            visibleForm: null,
            window_Desktop: null,
            _ActiveForm: null,
            _PrevActiveForm: null,
            moveAction: 0,
            windowHolderSelectionBoxX: 0,
            windowHolderSelectionBoxY: 0,
            IMAGE_WinIcon: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVFhH7dbRCYAgFIXhRnASN3ADJ3GSu4gbuIGD1SUlejCOBpLE+R4NOT/0UJtZDIMQBiEMQhiEMAj5b5C11nsfQhCRlFLOeT/Vx93eBDnndFuHY4w6rCdlu6lc6TccVHdumoeXcqsfgxAGIcNBs/GVIQxCGIQMB6m1Pq5Pvvz9mIpBCIMQBiEMQhiELBZkzAGoRY/1a8YOvQAAAABJRU5ErkJggg==')",
            IMAGE_WinIconHover: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVFhH7dYxCoQwEIVhb5NasNBGZCstBUFkL7Dg9ttq6QG8gJ2FB/I2DkS2EOUlghjkfUwVCfODhXrKMQxCGIQwCGEQwiDkuUF+GEdp8arq7NOU7fDupu84y6yPjZ0JCpJMdsvi/NfLYjnRu3dHXzFnHbTZJ7N7+B99yxyDEAYh1kFX4ytDGIQwCLEOEm59XI/c+ftxKQYhDEIYhDAIYRDiWJBSC3edj/DGIv8/AAAAAElFTkSuQmCC')",
            IMAGE_WinIconDown: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAoCAIAAAA35e4mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACnSURBVFhHY5AZZGDUQYTAqIMIgVEHEQKjDiIERh1ECAxfBynrGGvbehv6JFnGVrmUznWvXRE27zoQQaWJBuQ4SN3UHmg30GLHvIlAi4EiELuxIogW4gHJDkKzD4iwCsIRRBfxYNRBhMCogwgBkh1EazAaZYTAqIMIgVEHEQIkOwgIBlfligsMZPODpmDUQYTAqIMIgVEHEQKjDiIERh1ECAwyB8nIAADHEJbDMY47rQAAAABJRU5ErkJggg==')",
            config: {
                properties: {
                    TaskBar: null,
                    WindowHolder: null,
                    ButtonStart: null,
                    InputStartSearch: null,
                    ResizeCorners: 2,
                    Mouse_Down: false,
                    FadeLength: 100,
                    Window_BorderColorFocused: "#FBFBFB",
                    Window_BorderColor: "#FBFBFB",
                    Window_HeadingBackgroundColor: "white",
                    Window_DefaultBackgroundColor: "#F0F0F0",
                    /**
                     * This is used for testing
                     *
                     * @static
                     * @public
                     * @this Test.Form
                     * @memberof Test.Form
                     * @function getShowBodyOverLay
                     * @return  {boolean}
                     */
                    /**
                     * This is used for testing
                     *
                     * @static
                     * @public
                     * @this Test.Form
                     * @memberof Test.Form
                     * @function setShowBodyOverLay
                     * @param   {boolean}    value
                     * @return  {void}
                     */
                    ShowBodyOverLay: false,
                    Window_DefaultHeight: 480,
                    Window_DefaultWidth: 640,
                    WindowHolderSelectionBox: null
                },
                init: function () {
                    this.visibleForm = new (System.Collections.Generic.List$1(Test.Form))();
                }
            },
            getActiveForm: function () {
                return Test.Form._ActiveForm;
            },
            setActiveForm: function (value) {
                if (!Bridge.referenceEquals(Test.Form._ActiveForm, value)) {
                    Test.Form._PrevActiveForm = Test.Form._ActiveForm;

                    if (Test.Form._ActiveForm != null) {
                        if (Test.Form._ActiveForm.getBase() != null) {
                            Test.Form._ActiveForm.getBodyOverLay().style.visibility = "visible";

                            Test.Form._ActiveForm.getBase().style.borderColor = Test.Form.getWindow_BorderColor();
                        }
                    }
                    Test.Form._ActiveForm = value;
                    if (Test.Form._ActiveForm != null) {
                        if (Test.Form._ActiveForm.getBase() != null) {
                            Test.Form._ActiveForm.getBodyOverLay().style.visibility = "collapse";
                            Test.Form._ActiveForm.getBase().style.borderColor = Test.Form.getWindow_BorderColorFocused();
                            Test.Form._ActiveForm.bringToFront();
                        }
                    }
                }

            },
            midleOfAction: function () {
                return Test.Form.getWindowHolderSelectionBox() != null || Test.Form.movingForm != null;
            },
            setBodyOverLay: function () {
                for (var i = 0; i < Test.Form.visibleForm.getCount(); i = (i + 1) | 0) {
                    var frm = Test.Form.visibleForm.getItem(i);
                    if (frm != null && frm.getBodyOverLay() != null && frm.getBodyOverLay().style.visibility === "collapse") {
                        frm.getBodyOverLay().style.visibility = "visible";
                    }
                }
            },
            createStartSearchInput: function () {
                var input = Bridge.merge(document.createElement('input'), {
                    type: "text"
                } );
                var InputFocused = false;

                input.id = "StartSearchInput";
                input.style.position = "absolute";
                input.style.width = "344px";
                input.style.height = "40px";
                input.style.left = "48px";
                input.style.top = "0";
                input.style.backgroundColor = "#3F3F3F";

                input.style.borderStyle = "none";
                input.style.padding = "0";
                input.style.margin = "0";

                input.style.fontFamily = "Segoe UI";
                input.style.fontSize = "11pt";
                input.style.textIndent = "13px";
                input.style.color = "black";

                input.placeholder = "Search the web and Windows";

                //	Heading.Style.FontFamily = "Segoe UI";		
                input.addEventListener("keyup", function (ev) {
                    var kev = ev;

                    if (kev.keyCode === 13) {
                        // create a new Form

                        var frm = new Test.FormBrowser();
                        frm.setLeft("100px");
                        frm.setTop("100px");
                        //https://www.bing.com/search?q=
                        //https://www.google.com/#q=
                        frm.navigate(System.String.format("https://www.bing.com/search?q={0}", input.value));
                        frm.show();

                        input.blur();
                    }
                });


                input.onmouseup = $_.Test.Form.f1;
                $(input).on("focus", function () {
                    input.style.backgroundColor = "#F3F3F3";
                    input.style.outline = "0";
                });
                $(input).on("focusout", function () {
                    input.style.backgroundColor = "#3F3F3F";
                    input.value = "";
                    InputFocused = false;
                });
                $(input).on("focusin", function () {
                    input.style.backgroundColor = "#F3F3F3";
                    InputFocused = true;
                });

                input.onmousedown = $_.Test.Form.f2;

                input.onmouseenter = function (ev) {
                    if (Test.Form.movingForm != null) {
                        return;
                    }
                    if (InputFocused) {
                        input.style.backgroundColor = "#F3F3F3";
                    } else {
                        input.style.backgroundColor = "#575757";
                    }
                };

                input.onmouseleave = function (ev) {
                    if (Test.Form.movingForm != null) {
                        return;
                    }

                    if (InputFocused) {
                        input.style.backgroundColor = "#F3F3F3";
                    } else {
                        input.style.backgroundColor = "#3F3F3F";
                    }
                };

                return input;
            },
            changeStateTextSelection: function (element, state) {
                if (state) {
                    $(element).css("user-select", "text");
                } else {
                    $(element).css("user-select", "none");
                }
            },
            disableStateDrag: function (element) {
                if (Bridge.is(element, HTMLImageElement)) {
                    element.ondragstart = $_.Test.Form.f3;
                } else {
                    $(element).css("user-drag:", "none");
                }
            },
            createStartButton: function () {
                var butt = document.createElement('div');

                butt.style.width = "48px";
                butt.style.height = "40px";
                butt.style.position = "absolute";
                butt.style.fontSize = "12pt";
                butt.style.background = Test.Form.IMAGE_WinIcon;

                butt.onmouseup = function (ev) {
                    if (Test.Form.movingForm != null) {
                        return;
                    }

                    ev.stopPropagation();
                    ev.preventDefault();

                    butt.style.background = Test.Form.IMAGE_WinIcon;
                };

                butt.onmousedown = function (ev) {
                    if (Test.Form.movingForm != null) {
                        return;
                    }

                    Test.Form.setMouse_Down(true);

                    ev.stopPropagation();
                    ev.preventDefault();

                    butt.style.background = Test.Form.IMAGE_WinIconDown;

                    Test.Form.setActiveForm(null);
                };

                butt.onmouseenter = function (ev) {
                    if (Test.Form.movingForm != null) {
                        return;
                    }

                    if (Test.Form.getMouse_Down()) {
                        butt.style.background = Test.Form.IMAGE_WinIconDown;
                    } else {
                        butt.style.background = Test.Form.IMAGE_WinIconHover;
                    }
                };

                butt.onmouseleave = function (ev) {
                    if (Test.Form.movingForm != null) {
                        return;
                    }

                    butt.style.background = Test.Form.IMAGE_WinIcon;
                };

                return butt;
            },
            setup: function (parent) {
                if (parent === void 0) { parent = null; }
                var keyCodes = new (System.Collections.Generic.List$1(System.Int32))([61, 107, 173, 109, 187, 189]);

                document.addEventListener("keydown", function (ev) {
                    var kev = ev;

                    if (kev.ctrlKey && (keyCodes.contains(kev.which))) {
                        ev.preventDefault();
                    }
                });

                $(window).bind('mousewheel DOMMouseScroll', function (event) { if (event.ctrlKey == true) { event.preventDefault(); } });

                if (parent == null) {
                    Test.Form.parent = document.body;
                } else {
                    Test.Form.parent = parent;
                }

                Test.Form.setWindowHolder(document.createElement('div'));
                Test.Form.getWindowHolder().style.position = "absolute";

                Test.Form.getWindowHolder().style.width = "100%";
                Test.Form.getWindowHolder().style.height = "-webkit-calc(100% - 40px)";
                Test.Form.getWindowHolder().style.top = "0";
                Test.Form.getWindowHolder().style.left = "0";
                Test.Form.getWindowHolder().style.backgroundColor = "cornflowerblue";
                Test.Form.getWindowHolder().style.zIndex = "0";
                Test.Form.getWindowHolder().style.overflow = "auto";

                Test.Form.getWindowHolder().addEventListener("mousedown", $_.Test.Form.f4);

                //SetBodyOverLay();

                Test.Form.changeStateTextSelection(Test.Form.getWindowHolder(), false);

                Test.Form.setTaskBar(document.createElement('div'));
                Test.Form.getTaskBar().style.position = "absolute";

                Test.Form.getTaskBar().style.width = "100%";
                Test.Form.getTaskBar().style.height = "40px";
                Test.Form.getTaskBar().style.top = "-webkit-calc(100% - 40px)";
                Test.Form.getTaskBar().style.left = "0";
                Test.Form.getTaskBar().style.zIndex = (2147483647).toString();

                Test.Form.changeStateTextSelection(Test.Form.getTaskBar(), false);

                Test.Form.getTaskBar().style.backgroundColor = "#101010";

                Test.Form.setButtonStart(Test.Form.createStartButton());

                Test.Form.setInputStartSearch(Test.Form.createStartSearchInput());

                var mouseMove = $_.Test.Form.f5;

                window.addEventListener("mouseup", $_.Test.Form.f7);

                window.addEventListener("mousemove", mouseMove);

                Test.Form.parent.appendChild(Test.Form.getWindowHolder());
                Test.Form.parent.appendChild(Test.Form.getTaskBar());

                Test.Form.getTaskBar().appendChild(Test.Form.getButtonStart());
                Test.Form.getTaskBar().appendChild(Test.Form.getInputStartSearch());

                Test.Form.window_Desktop = Bridge.merge(new Test.FileExplorer(Test.Form.getWindowHolder()), {
                    setNodeViewType: Test.NodeViewType.Medium_Icons,
                    setPath: Test.FileExplorer.DesktopPath
                } );
            },
            setInternalLabel: function (element) {
                element.setAttribute("IL", "1"); // Internal Label
            },
            calculateZOrder: function () {
                if (Test.Form.visibleForm == null) {
                    return;
                }
                for (var i = 0; i < Test.Form.visibleForm.getCount(); i = (i + 1) | 0) {
                    if (Test.Form.visibleForm.getItem(i) != null && Test.Form.visibleForm.getItem(i).getBase() != null) {
                        $(Test.Form.visibleForm.getItem(i).getBase()).css("zIndex", ((i + 1) | 0));
                    }
                }
            }
        },
        prev_px: 0,
        prev_py: 0,
        prev_width: 0,
        prev_height: 0,
        prev_top: 0,
        prev_left: 0,
        config: {
            properties: {
                Base: null,
                Heading: null,
                ButtonClose: null,
                ButtonExpand: null,
                ButtonMinimize: null,
                HeadingTitle: null,
                Body: null,
                BodyOverLay: null,
                Owner: null,
                MinWidth: 200,
                MinHeight: 50,
                windowState: 0
            }
        },
        ctor: function () {
            this.$initialize();
            this.setBase(document.createElement('div'));
            this.setHeading(document.createElement('div'));
            this.setHeadingTitle(document.createElement('span'));
            this.setBody(document.createElement('div'));
            this.setBodyOverLay(document.createElement('div'));

            this.getBase().id = "Base";
            this.getBase().style.borderStyle = "solid";
            this.getBase().style.borderWidth = "2px";
            this.getBase().style.backgroundColor = Test.Form.getWindow_HeadingBackgroundColor();

            this.getBase().style.borderColor = Test.Form.getWindow_BorderColorFocused();
            $(this.getBase()).css("box-shadow", "0px 0px 63px -17px rgba(0,0,0,0.75)");

            this.getBodyOverLay().style.visibility = "collapse";

            this.getBase().addEventListener("mousedown", Bridge.fn.bind(this, $_.Test.Form.f8));

            this.getHeading().addEventListener("dblclick", Bridge.fn.bind(this, $_.Test.Form.f9));

            this.getBase().addEventListener("mousemove", Bridge.fn.bind(this, $_.Test.Form.f10));

            this.getBase().style.position = "absolute";

            this.getHeading().id = "Heading";
            this.getHeading().style.height = "29px";
            this.getHeading().style.width = "100%";
            this.getHeading().style.verticalAlign = "top";
            this.getHeading().style.cursor = "default";
            this.getHeading().style.backgroundColor = Test.Form.getWindow_HeadingBackgroundColor();
            this.getHeading().style.marginTop = "0";
            this.getHeading().style.marginLeft = "0";
            this.getHeading().style.marginRight = "0";
            this.getHeading().style.marginBottom = "0";
            this.getHeading().style.paddingBottom = "1px";
            this.getHeading().style.fontFamily = "Segoe UI";
            this.getHeading().style.textAlign = 7;

            this.getHeading().addEventListener("mousedown", Bridge.fn.bind(this, $_.Test.Form.f11));

            this.getHeadingTitle().style.textIndent = "3px";
            Test.Form.setInternalLabel(this.getHeadingTitle()); // Internal Label

            this.setButtonClose(this.createFormButton(Test.Form.FormButtonType.Close));
            this.setButtonExpand(this.createFormButton(Test.Form.FormButtonType.Maximize));
            this.setButtonMinimize(this.createFormButton(Test.Form.FormButtonType.Minimize));

            $(this.getHeading()).css("user-select", "none").css("user-drag:", "none");

            $(this.getBase()).css("user-select", "none").css("user-drag:", "none");

            $(this.getHeadingTitle()).css("user-select", "none").css("user-drag:", "none");

            this.getBody().id = "Body";
            this.getBody().style.top = "30px";
            this.getBody().style.height = "-webkit-calc(100% - 30px)"; // -webkit-calc(100% - 60px)
            this.getBody().style.width = "-webkit-calc(100% - 1px)"; // "100%";
            this.getBody().style.position = "absolute";
            this.getBody().style.backgroundColor = Test.Form.getWindow_DefaultBackgroundColor();

            this.getBody().addEventListener("mousedown", Bridge.fn.bind(this, $_.Test.Form.f12));

            this.getBody().addEventListener("mousemove", $_.Test.Form.f13);

            this.getBodyOverLay().style.top = "31px";
            this.getBodyOverLay().style.height = "-webkit-calc(100% - 33px)"; // -webkit-calc(100% - 60px)
            this.getBodyOverLay().style.width = "-webkit-calc(100% - 4px)";
            this.getBodyOverLay().style.left = "2px";
            this.getBodyOverLay().style.position = "absolute";
            this.getBodyOverLay().style.zIndex = (2147483647).toString();
            this.getBodyOverLay().style.opacity = Test.Form.getShowBodyOverLay() ? "0.5" : "0";
            this.getBodyOverLay().style.backgroundColor = "black";

            this.getBodyOverLay().addEventListener("mousedown", Bridge.fn.bind(this, $_.Test.Form.f14));

            this.getBody().addEventListener("mouseleave", $_.Test.Form.f15);

            this.getBodyOverLay().addEventListener("mouseenter", Bridge.fn.bind(this, $_.Test.Form.f16));

            $(this.getBase()).css("width", Test.Form.getWindow_DefaultWidth()).css("height", Test.Form.getWindow_DefaultHeight());

            this.getBase().appendChild(this.getHeading());
            this.getBase().appendChild(this.getBody());
            this.getBase().appendChild(this.getBodyOverLay());

            this.getHeading().appendChild(this.getHeadingTitle());
            this.getHeading().appendChild(this.getButtonClose());
            this.getHeading().appendChild(this.getButtonExpand());
            this.getHeading().appendChild(this.getButtonMinimize());

            this.initialise();
        },
        getHeight: function () {
            return this.getBase().style.height;
        },
        setHeight: function (value) {
            this.getBase().style.height = value;
        },
        getWidth: function () {
            return this.getBase().style.width;
        },
        setWidth: function (value) {
            this.getBase().style.width = value;
        },
        getLeft: function () {
            return this.getBase().style.left;
        },
        setLeft: function (value) {
            this.getBase().style.left = value;
        },
        getTop: function () {
            return this.getBase().style.top;
        },
        setTop: function (value) {
            this.getBase().style.top = value;
        },
        getText: function () {
            return this.getHeadingTitle().innerHTML;
        },
        setText: function (value) {
            this.getHeadingTitle().innerHTML = value;
        },
        getBackColor: function () {
            return this.getBody().style.backgroundColor;
        },
        setBackColor: function (value) {
            this.getBody().style.backgroundColor = value;
        },
        getForeColor: function () {
            return this.getBody().style.color;
        },
        setForeColor: function (value) {
            this.getBody().style.color = value;
        },
        isVisible: function () {
            return this.getBase() != null && this.getBase().style.visibility === "visible";
        },
        initialise: function () {

        },
        onShowing: function () {

        },
        onShowed: function () {

        },
        onClosing: function () {

        },
        changeWindowState: function () {
            if (this.getwindowState() === Test.Form.WindowState.Maximized) {
                this.setWidth(System.String.concat(this.prev_width, "px"));
                this.setHeight(System.String.concat(this.prev_height, "px"));

                this.setTop(System.String.concat(this.prev_top, "px"));
                this.setLeft(System.String.concat(this.prev_left, "px"));

                this.setwindowState(Test.Form.WindowState.Normal);
            } else {
                this.prev_height = parseInt(this.getHeight());
                this.prev_width = parseInt(this.getWidth());

                this.prev_left = parseInt(this.getLeft());
                this.prev_top = parseInt(this.getTop());

                this.setwindowState(Test.Form.WindowState.Maximized);

                this.setWidth("-webkit-calc(100% - 5px)");
                this.setHeight("-webkit-calc(100% - 5px)");

                this.setTop("0");
                this.setLeft("0");
            }
        },
        createFormButton: function (Type) {
            var butt = document.createElement('div');

            butt.style.width = "45px";
            butt.style.height = "29px";
            butt.style.position = "absolute";
            butt.style.fontSize = "12pt";

            switch (Type) {
                case Test.Form.FormButtonType.Close: 
                    butt.style.backgroundColor = "white";
                    butt.style.color = "black";
                    butt.style.left = "-webkit-calc(100% - 45px)";
                    butt.id = "Close";
                    butt.innerHTML = "&#10006";
                    butt.onmousedown = Bridge.fn.bind(this, function (ev) {
                        if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }
                        Test.Form.setMouse_Down(true);

                        ev.stopPropagation();
                        ev.preventDefault();

                        butt.style.backgroundColor = "#F1707A";
                        butt.style.color = "white";

                        Test.Form.setActiveForm(this);
                    });
                    butt.onmouseup = Bridge.fn.bind(this, $_.Test.Form.f17);
                    butt.onmouseenter = Bridge.fn.bind(this, function (ev) {
                        if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        this.setCursor("default");

                        if (Test.Form.getMouse_Down()) {
                            butt.style.backgroundColor = "#F1707A";
                        } else {
                            butt.style.backgroundColor = "#E81123";
                        }
                        butt.style.color = "white";
                    });
                    butt.onmouseleave = function (ev) {
                        if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        butt.style.backgroundColor = "white";
                        butt.style.color = "black";
                    };
                    break;
                case Test.Form.FormButtonType.Maximize: 
                    butt.style.backgroundColor = "white";
                    butt.style.left = "-webkit-calc(100% - 91px)";
                    butt.style.color = "black";
                    butt.id = "Maximize";
                    butt.innerHTML = "&#9633;";
                    butt.style.fontSize = "14pt";
                    butt.onmouseup = Bridge.fn.bind(this, function (ev) {
                        if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        ev.stopPropagation();
                        ev.preventDefault();

                        Test.Form.setMouse_Down(false);

                        butt.style.backgroundColor = "white";
                        butt.style.color = "black";

                        this.changeWindowState();
                    });
                    break;
                case Test.Form.FormButtonType.Minimize: 
                    butt.style.backgroundColor = "white";
                    butt.style.left = "-webkit-calc(100% - 137px)";
                    butt.style.color = "black";
                    butt.id = "Minimize";
                    butt.innerHTML = "&#8213;";
                    butt.onmouseup = Bridge.fn.bind(this, function (ev) {
                        if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                            return;
                        }

                        ev.stopPropagation();
                        ev.preventDefault();

                        Test.Form.setMouse_Down(false);

                        butt.style.backgroundColor = "white";
                        butt.style.color = "black";

                        this.setwindowState(Test.Form.WindowState.Minimized);
                    });
                    break;
                case Test.Form.FormButtonType.Restore: 
                    break;
                case Test.Form.FormButtonType.Help: 
                    break;
                default: 
                    butt.onmouseup = $_.Test.Form.f18;
                    break;
            }

            butt.onmousemove = $_.Test.Form.f19;

            if (Type !== Test.Form.FormButtonType.Close) {
                butt.onmousedown = Bridge.fn.bind(this, function (ev) {
                    if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                        return;
                    }

                    Test.Form.setMouse_Down(true);

                    ev.stopPropagation();
                    ev.preventDefault();

                    butt.style.backgroundColor = "#CACACA";
                    butt.style.color = "black";

                    Test.Form.setActiveForm(this);
                });

                butt.onmouseenter = Bridge.fn.bind(this, function (ev) {
                    if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                        return;
                    }
                    this.setCursor("default");

                    if (Test.Form.getMouse_Down()) {
                        butt.style.backgroundColor = "#CACACA";
                    } else {
                        butt.style.backgroundColor = "#E5E5E5";
                    }
                    butt.style.color = "black";
                });

                butt.onmouseleave = function (ev) {
                    if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                        return;
                    }

                    butt.style.backgroundColor = "white";
                    butt.style.color = "black";
                };
            }

            butt.style.top = "0";

            butt.style.padding = "0";
            butt.style.margin = "0";
            butt.style.borderWidth = "0";

            butt.style.fontFamily = "Lucida Sans Unicode";
            butt.style.textAlign = "center";

            return butt;

        },
        setCursor: function (cur) {
            this.getBase().style.cursor = cur;
            this.getHeading().style.cursor = cur;
        },
        changeSelectionState$1: function (TurnOff) {
            if (TurnOff === void 0) { TurnOff = true; }
            this.changeSelectionState(Test.Form.parent.children, TurnOff);
        },
        changeSelectionState: function (Children, TurnOff) {
            var $t;
            if (TurnOff === void 0) { TurnOff = true; }
            if (Children == null) {
                return;
            }

            $t = Bridge.getEnumerator(Children);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                if ((Bridge.referenceEquals(item.tagName.toLowerCase(), "input") || Bridge.referenceEquals(item.tagName.toLowerCase(), "span") || Bridge.referenceEquals(item.tagName.toLowerCase(), "textarea")) && !Bridge.referenceEquals(item.getAttribute("IL"), "1")) {
                    Test.Form.changeStateTextSelection(item, !TurnOff);
                }
                if (item.childElementCount > 0) {
                    this.changeSelectionState(item.children, TurnOff);
                }
            }
        },
        show: function (owner) {
            if (owner === void 0) { owner = null; }
            if (!Test.Form.visibleForm.contains(this)) {
                this.onShowing();

                if (owner == null) {
                    Test.Form.getWindowHolder().appendChild(this.getBase());
                    owner = Test.Form.getWindowHolder();
                } else {
                    owner.appendChild(this.getBase());
                }

                this.setOwner(owner);

                this.getBase().style.visibility = "visible";

                this.getBody().focus();

                Test.Form.visibleForm.add(this);

                Test.Form.calculateZOrder();

                this.onShowed();
            }

            Test.Form.setActiveForm(this);
        },
        bringToFront: function () {
            if (Test.Form.visibleForm.getCount() > 1 && !Bridge.referenceEquals(Test.Form.visibleForm.getItem(((Test.Form.visibleForm.getCount() - 1) | 0)), this)) {
                Test.Form.visibleForm.remove(this);
                Test.Form.visibleForm.add(this);
            }

            Test.Form.calculateZOrder();
        },
        close: function () {
            this.onClosing();

            Test.Form.setActiveForm(Test.Form._PrevActiveForm);

            Test.Form.visibleForm.remove(this);

            if (this.getBase() != null) {
                $(this.getBase()).fadeOut(Test.Form.getFadeLength(), Bridge.fn.bind(this, $_.Test.Form.f20));
            }

            Test.Form.calculateZOrder();
        },
        fillControlWithParent: function (element, widthOffset, heightOffset) {
            if (widthOffset === void 0) { widthOffset = 8; }
            if (heightOffset === void 0) { heightOffset = 9; }
            element.style.position = "absolute";
            element.style.width = System.String.concat(System.String.concat("-webkit-calc(100% - ", widthOffset.toString()), "px)");
            element.style.height = System.String.concat(System.String.concat("-webkit-calc(100% - ", heightOffset.toString()), "px)");

            element.style.top = "1px";
            element.style.left = "1px";
        },
        fillHorizontalControlWithParent: function (element, widthOffset) {
            if (widthOffset === void 0) { widthOffset = 8; }
            element.style.position = "absolute";
            element.style.width = System.String.concat(System.String.concat("-webkit-calc(100% - ", widthOffset.toString()), "px)");

            element.style.left = "1px";
        },
        fillVerticalControlWithParent: function (element, heightOffset) {
            if (heightOffset === void 0) { heightOffset = 9; }
            element.style.position = "absolute";
            element.style.height = System.String.concat(System.String.concat("-webkit-calc(100% - ", heightOffset.toString()), "px)");

            element.style.top = "1px";
        }
    });

    Bridge.ns("Test.Form", $_);

    Bridge.apply($_.Test.Form, {
        f1: function (ev) {
            if (Test.Form.movingForm != null) {
                return;
            }

            ev.stopPropagation();
        },
        f2: function (ev) {
            if (Test.Form.movingForm != null) {
                return;
            }

            Test.Form.setMouse_Down(true);

            ev.stopPropagation();

            Test.Form.setActiveForm(null);
        },
        f3: function (ev) {
            ev.preventDefault();
        },
        f4: function (ev) {
            if (Test.Form.movingForm == null) {
                Test.Form.setWindowHolderSelectionBox(document.createElement('div'));
                Test.Form.getWindowHolderSelectionBox().style.position = "absolute";
                Test.Form.getWindowHolderSelectionBox().style.visibility = "visible";
                Test.Form.getWindowHolderSelectionBox().style.borderWidth = "thin";
                Test.Form.getWindowHolderSelectionBox().style.borderStyle = "solid";
                Test.Form.getWindowHolderSelectionBox().style.borderColor = "black";
                Test.Form.getWindowHolderSelectionBox().style.backgroundColor = "grey";
                Test.Form.getWindowHolderSelectionBox().style.opacity = "0.35";

                Test.Form.getWindowHolder().appendChild(Test.Form.getWindowHolderSelectionBox());

                var mev = ev;
                Test.Form.windowHolderSelectionBoxX = mev.clientX;
                Test.Form.windowHolderSelectionBoxY = mev.clientY;

                Test.Form.getWindowHolderSelectionBox().style.zIndex = "0";

                Test.Form.window_Desktop.clearSelection();

                Test.Form.setMouse_Down(true);

                Test.Form.setActiveForm(null);
            }
        },
        f5: function (ev) {
            var mev = ev;

            if (Test.Form.movingForm != null) {
                if (Test.Form.movingForm.getBodyOverLay().style.visibility === "collapse") {
                    Test.Form.movingForm.getBodyOverLay().style.visibility = "visible";
                    Test.Form.movingForm.changeSelectionState$1(true);
                    Test.Form.movingForm.getHeading().focus();
                }

                var obj = $(Test.Form.movingForm.getBase());

                var Y = (((mev.clientY + Test.Form.movingForm.prev_py) | 0));
                var X = (((mev.clientX + Test.Form.movingForm.prev_px) | 0));

                if (Test.Form.movingForm.getwindowState() === Test.Form.WindowState.Maximized && Test.Form.moveAction === Test.Form.MouseMoveAction.Move) {
                    Test.Form.movingForm.changeWindowState();
                    X = (mev.clientX - (((Bridge.Int.div(Test.Form.movingForm.prev_width, 2)) | 0))) | 0;

                    Test.Form.movingForm.prev_px = (X - mev.clientX) | 0;
                }

                var X1;
                var Y1;

                var W;
                var H;

                if (Y < 0) {
                    Y = 1;
                }
                if (X < 0) {
                    X = 1;
                }

                ev.stopPropagation();

                switch (Test.Form.moveAction) {
                    case Test.Form.MouseMoveAction.Move: 
                        obj.css("top", Y);
                        obj.css("left", X);
                        break;
                    case Test.Form.MouseMoveAction.TopLeftResize: 
                        X1 = parseInt(obj.css("left"));
                        Y1 = parseInt(obj.css("top"));
                        W = parseInt(obj.css("width"));
                        H = parseInt(obj.css("height"));
                        W = (W - (((X - X1) | 0))) | 0;
                        H = (H - (((Y - Y1) | 0))) | 0;
                        if (W < Test.Form.movingForm.getMinWidth()) {
                            X = (X - (((Test.Form.movingForm.getMinWidth() - W) | 0))) | 0;
                            W = Test.Form.movingForm.getMinWidth();
                        }
                        if (H < Test.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((Test.Form.movingForm.getMinHeight() - H) | 0))) | 0;
                            H = Test.Form.movingForm.getMinHeight();
                        }
                        obj.css("top", Y);
                        obj.css("left", X);
                        obj.css("width", W);
                        obj.css("height", H);
                        break;
                    case Test.Form.MouseMoveAction.TopResize: 
                        Y1 = parseInt(obj.css("top"));
                        H = parseInt(obj.css("height"));
                        H = (H - (((Y - Y1) | 0))) | 0;
                        if (H < Test.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((Test.Form.movingForm.getMinHeight() - H) | 0))) | 0;
                            H = Test.Form.movingForm.getMinHeight();
                        }
                        obj.css("top", Y);
                        obj.css("height", H);
                        break;
                    case Test.Form.MouseMoveAction.TopRightResize: 
                        Y1 = parseInt(obj.css("top"));
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        H = parseInt(obj.css("height"));
                        H = (H - (((Y - Y1) | 0))) | 0;
                        W = (mev.clientX - X1) | 0;
                        if (H < Test.Form.movingForm.getMinHeight()) {
                            Y = (Y - (((Test.Form.movingForm.getMinHeight() - H) | 0))) | 0;
                            H = Test.Form.movingForm.getMinHeight();
                        }
                        if (W < Test.Form.movingForm.getMinWidth()) {
                            W = Test.Form.movingForm.getMinWidth();
                        }
                        obj.css("top", Y);
                        obj.css("height", H);
                        obj.css("width", W);
                        break;
                    case Test.Form.MouseMoveAction.LeftResize: 
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        W = (W - (((X - X1) | 0))) | 0;
                        if (W < Test.Form.movingForm.getMinWidth()) {
                            X = (X - (((Test.Form.movingForm.getMinWidth() - W) | 0))) | 0;
                            W = Test.Form.movingForm.getMinWidth();
                        }
                        obj.css("left", X);
                        obj.css("width", W);
                        break;
                    case Test.Form.MouseMoveAction.BottomLeftResize: 
                        X1 = parseInt(obj.css("left"));
                        Y1 = parseInt(obj.css("top"));
                        W = parseInt(obj.css("width"));
                        H = parseInt(obj.css("height"));
                        W = (W - (((X - X1) | 0))) | 0;
                        H = (mev.clientY - Y1) | 0;
                        if (W < Test.Form.movingForm.getMinWidth()) {
                            X = (X - (((Test.Form.movingForm.getMinWidth() - W) | 0))) | 0;
                            W = Test.Form.movingForm.getMinWidth();
                        }
                        if (H < Test.Form.movingForm.getMinHeight()) {
                            H = Test.Form.movingForm.getMinHeight();
                        }
                        obj.css("left", X);
                        obj.css("width", W);
                        obj.css("height", H);
                        break;
                    case Test.Form.MouseMoveAction.BottomResize: 
                        Y1 = parseInt(obj.css("top"));
                        H = parseInt(obj.css("height"));
                        H = (mev.clientY - Y1) | 0;
                        if (H < Test.Form.movingForm.getMinHeight()) {
                            H = Test.Form.movingForm.getMinHeight();
                        }
                        obj.css("height", H);
                        break;
                    case Test.Form.MouseMoveAction.RightResize: 
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        W = (mev.clientX - X1) | 0;
                        if (W < Test.Form.movingForm.getMinWidth()) {
                            W = Test.Form.movingForm.getMinWidth();
                        }
                        obj.css("width", W);
                        break;
                    case Test.Form.MouseMoveAction.BottomRightResize: 
                        Y1 = parseInt(obj.css("top"));
                        H = parseInt(obj.css("height"));
                        X1 = parseInt(obj.css("left"));
                        W = parseInt(obj.css("width"));
                        W = (mev.clientX - X1) | 0;
                        H = (mev.clientY - Y1) | 0;
                        if (H < Test.Form.movingForm.getMinHeight()) {
                            H = Test.Form.movingForm.getMinHeight();
                        }
                        if (W < Test.Form.movingForm.getMinWidth()) {
                            W = Test.Form.movingForm.getMinWidth();
                        }
                        obj.css("width", W);
                        obj.css("height", H);
                        break;
                    default: 
                        break;
                }
            } else if (Test.Form.getWindowHolderSelectionBox() != null && Test.Form.getWindowHolderSelectionBox().style.visibility === "visible") {
                if (Test.Form.getMouse_Down()) {
                    Test.Form.getWindowHolderSelectionBox().style.cursor = "default";
                    Test.Form.getWindowHolder().style.cursor = "default";

                    var left;
                    var top;
                    var width;
                    var height;

                    if (Test.Form.windowHolderSelectionBoxX > mev.clientX) {
                        left = mev.clientX;
                        width = (Test.Form.windowHolderSelectionBoxX - mev.clientX) | 0;
                    } else {
                        left = Test.Form.windowHolderSelectionBoxX;
                        width = (mev.clientX - Test.Form.windowHolderSelectionBoxX) | 0;
                    }

                    if (Test.Form.windowHolderSelectionBoxY > mev.clientY) {
                        top = mev.clientY;
                        height = (Test.Form.windowHolderSelectionBoxY - mev.clientY) | 0;
                    } else {
                        top = Test.Form.windowHolderSelectionBoxY;
                        height = (mev.clientY - Test.Form.windowHolderSelectionBoxY) | 0;
                    }

                    Test.Form.getWindowHolderSelectionBox().style.left = System.String.concat(left, "px");
                    Test.Form.getWindowHolderSelectionBox().style.top = System.String.concat(top, "px");

                    Test.Form.getWindowHolderSelectionBox().style.width = System.String.concat(width, "px");
                    Test.Form.getWindowHolderSelectionBox().style.height = System.String.concat(height, "px");

                    var SelectionRec = new Test.Rectange.$ctor1(left, top, width, height);

                    for (var i = 0; i < Test.Form.window_Desktop.loadedNodes.getCount(); i = (i + 1) | 0) {
                        if (Test.Form.window_Desktop.loadedNodes.getItem(i) != null) {
                            var htmlNode = Test.Form.window_Desktop.loadedNodes.getItem(i).getNodeBase();
                            if (htmlNode != null) {
                                if (Test.Rectange.rectOverlap(Test.Rectange.createFromHTMLElement(htmlNode).$clone(), SelectionRec.$clone())) {
                                    Test.Form.window_Desktop.loadedNodes.getItem(i).setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.Selected);
                                } else {
                                    Test.Form.window_Desktop.loadedNodes.getItem(i).setNodeExplorerState(Test.FileExplorerNode.FileExplorerState.None);
                                }
                            }
                        }
                    }

                    mev.stopImmediatePropagation();
                    mev.preventDefault();
                }
            }
        },
        f6: function () {
            Test.Form.getWindowHolderSelectionBox().remove();
            Test.Form.setWindowHolderSelectionBox(null);
        },
        f7: function (ev) {
            if (Test.Form.movingForm != null) {
                Test.Form.movingForm.getBodyOverLay().style.visibility = "collapse";
                Test.Form.movingForm.changeSelectionState$1(false);
            }

            Test.Form.movingForm = null;
            Test.Form.setMouse_Down(false);
            Test.Form.moveAction = Test.Form.MouseMoveAction.Move;
            if (Test.Form.getWindowHolderSelectionBox() != null) {
                $(Test.Form.getWindowHolderSelectionBox()).fadeOut(Test.Form.getFadeLength(), $_.Test.Form.f6);
            }
        },
        f8: function (ev) {
            var mev = ev;

            Test.Form.setMouse_Down(true);
            Test.Form.movingForm = this;

            Test.Form.setActiveForm(this);

            Test.Form.setBodyOverLay();

            var obj = $(this.getBase());

            this.prev_px = (parseInt(obj.css("left")) - mev.clientX) | 0;
            this.prev_py = (parseInt(obj.css("top")) - mev.clientY) | 0;

            if (this.getwindowState() === Test.Form.WindowState.Maximized) {
                this.setCursor("default");

                Test.Form.moveAction = Test.Form.MouseMoveAction.Move;
                return;
            }

            if (mev.layerX <= Test.Form.getResizeCorners() && mev.layerY <= Test.Form.getResizeCorners()) {
                this.setCursor("nwse-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.TopLeftResize;
            } else if (mev.layerY <= Test.Form.getResizeCorners() && mev.layerX >= ((parseInt(this.getWidth()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.TopRightResize;
            } else if (mev.layerY <= Test.Form.getResizeCorners()) {
                this.setCursor("n-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.TopResize;
            } else if (mev.layerX <= Test.Form.getResizeCorners() && mev.layerY >= ((parseInt(this.getHeight()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.BottomLeftResize;
            } else if (mev.layerY >= ((parseInt(this.getHeight()) - Test.Form.getResizeCorners()) | 0) && mev.layerX >= ((parseInt(this.getWidth()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("nwse-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.BottomRightResize;
            } else if (mev.layerY >= ((parseInt(this.getHeight()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("s-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.BottomResize;
            } else if (mev.layerX <= Test.Form.getResizeCorners()) {
                this.setCursor("w-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.LeftResize;

            } else if (mev.layerX >= ((parseInt(this.getWidth()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("e-resize");

                Test.Form.moveAction = Test.Form.MouseMoveAction.RightResize;
            } else {
                this.setCursor("default");

                Test.Form.moveAction = Test.Form.MouseMoveAction.Move;
                return;
            }

            this.changeSelectionState$1();

            mev.stopPropagation();
        },
        f9: function (ev) {
            this.changeWindowState();
            ev.preventDefault();
            ev.stopPropagation();
        },
        f10: function (ev) {
            var mev = ev;
            if (Test.Form.movingForm != null && Test.Form.moveAction === Test.Form.MouseMoveAction.Move) {
                this.setCursor("default");
                return;
            } else if (this.getwindowState() === Test.Form.WindowState.Maximized) {
                this.setCursor("default");
                return;
            } else if (Test.Form.getWindowHolderSelectionBox() != null) {
                this.setCursor("default");
                return;
            }

            if (Test.Form.moveAction === Test.Form.MouseMoveAction.TopLeftResize || mev.layerX <= Test.Form.getResizeCorners() && mev.layerY <= Test.Form.getResizeCorners()) {
                this.setCursor("nwse-resize");
            } else if (Test.Form.moveAction === Test.Form.MouseMoveAction.TopRightResize || mev.layerY <= Test.Form.getResizeCorners() && mev.layerX >= ((parseInt(this.getWidth()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");
            } else if (mev.layerY <= Test.Form.getResizeCorners() || Test.Form.moveAction === Test.Form.MouseMoveAction.TopResize) {
                this.setCursor("n-resize");
            } else if (Test.Form.moveAction === Test.Form.MouseMoveAction.BottomLeftResize || mev.layerX <= Test.Form.getResizeCorners() && mev.layerY >= ((parseInt(this.getHeight()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("nesw-resize");
            } else if (Test.Form.moveAction === Test.Form.MouseMoveAction.BottomRightResize || mev.layerY >= ((parseInt(this.getHeight()) - Test.Form.getResizeCorners()) | 0) && mev.layerX >= ((parseInt(this.getWidth()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("nwse-resize");
            } else if (Test.Form.moveAction === Test.Form.MouseMoveAction.BottomResize || mev.layerY >= ((parseInt(this.getHeight()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("s-resize");
            } else if (Test.Form.moveAction === Test.Form.MouseMoveAction.LeftResize || mev.layerX <= Test.Form.getResizeCorners()) {
                this.setCursor("w-resize");
            } else if (Test.Form.moveAction === Test.Form.MouseMoveAction.RightResize || mev.layerX >= ((parseInt(this.getWidth()) - Test.Form.getResizeCorners()) | 0)) {
                this.setCursor("e-resize");
            } else {
                this.setCursor("default");
            }
        },
        f11: function (ev) {
            Test.Form.setBodyOverLay();

            if (this.getwindowState() === Test.Form.WindowState.Maximized) {
                Test.Form.movingForm = this;
                this.setCursor("default");

                Test.Form.moveAction = Test.Form.MouseMoveAction.Move;
            } else {
                Test.Form.movingForm = this;
            }

            Test.Form.setActiveForm(this);
        },
        f12: function (ev) {
            Test.Form.setActiveForm(this);
            ev.stopPropagation();
        },
        f13: function (ev) {
            if (Test.Form.movingForm == null) {
                ev.stopPropagation();
            }
        },
        f14: function (ev) {
            this.getBodyOverLay().style.visibility = "collapse";
            Test.Form.setActiveForm(this);
        },
        f15: function (ev) {
            if (Test.Form.movingForm == null) {
                Test.Form.setBodyOverLay();
            }
        },
        f16: function (ev) {
            if (Test.Form.getWindowHolderSelectionBox() == null && Test.Form.movingForm == null) {
                this.getBodyOverLay().style.visibility = "collapse";
            } else {
                this.getBodyOverLay().style.visibility = "visible";
            }
        },
        f17: function (ev) {
            if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            this.close();
        },
        f18: function (ev) {
            if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                return;
            }

            ev.stopPropagation();
            ev.preventDefault();

            Test.Form.setMouse_Down(false);
        },
        f19: function (ev) {
            if (Test.Form.movingForm != null || Test.Form.getWindowHolderSelectionBox() != null) {
                return;
            }

            ev.stopImmediatePropagation();
            ev.preventDefault();
        },
        f20: function () {
            $(this.getBase()).empty();
            this.getBase().remove();
            this.setBase(null);
        }
    });

    Bridge.define("Test.Form.FormButtonType", {
        $kind: "enum",
        statics: {
            Close: 0,
            Maximize: 1,
            Minimize: 2,
            Restore: 3,
            Help: 4
        }
    });

    Bridge.define("Test.Form.MouseMoveAction", {
        $kind: "enum",
        statics: {
            Move: 0,
            TopLeftResize: 1,
            LeftResize: 2,
            BottomLeftResize: 3,
            BottomResize: 4,
            BottomRightResize: 5,
            RightResize: 6,
            TopResize: 7,
            TopRightResize: 8
        }
    });

    Bridge.define("Test.Form.WindowState", {
        $kind: "enum",
        statics: {
            Normal: 0,
            Minimized: 1,
            Maximized: 2
        }
    });

    Bridge.define("Test.NodeViewType", {
        $kind: "enum",
        statics: {
            Content: 0,
            Tiles: 1,
            Details: 2,
            List: 3,
            Small_Icons: 4,
            Medium_Icons: 5,
            Large_Icons: 6,
            Extra_Large_Icons: 7
        }
    });

    Bridge.define("Test.Path", {
        statics: {
            getDirectoryName: function (path) {
                var FileName = Test.Path.getFileName(path);
                return path.substr(0, ((((path.length - FileName.length) | 0) - 1) | 0));
            },
            getFileName: function (path) {
                if (path != null) {
                    //                CheckInvalidPathChars(path, false);
                    var length = path.length;
                    var num2 = length;
                    while (((num2 = (num2 - 1) | 0)) >= 0) {
                        var ch = path.charCodeAt(num2);
                        if (((ch === 92) || (ch === 47)) || (ch === 58)) {
                            return path.substr(((num2 + 1) | 0), (((((length - num2) | 0)) - 1) | 0));
                        }
                    }
                }
                return path;
            }
        }
    });

    Bridge.define("Test.Process", {
        statics: {
            start: function (fileName) {
                var DirectoryName = Test.Path.getDirectoryName(fileName);
                var FileName = Test.Path.getFileName(fileName);

                if (Bridge.referenceEquals(DirectoryName, Test.FileExplorer.DesktopPath)) {
                    switch (FileName) {
                        case "iexplore.exe": 
                            var iexplore = new Test.FormBrowser();
                            iexplore.setLeft("50px");
                            iexplore.setTop("50px");
                            iexplore.setText("Bing");
                            iexplore.navigate("https://bing.com");
                            iexplore.show();
                            break;
                        case "Notepad.exe": 
                            var Notepad = new Test.FormNotePad();
                            Notepad.setLeft("50px");
                            Notepad.setTop("50px");
                            Notepad.setText("Note Pad");
                            Notepad.show();
                            break;
                        case "cmd.exe": 
                            var cmd = new Test.FormConsole();
                            cmd.setLeft("50px");
                            cmd.setTop("50px");
                            cmd.setText("Command Prompt");
                            cmd.show();
                            break;
                    }
                } else {

                }

                return null;
            }
        }
    });

    Bridge.define("Test.Rectange", {
        $kind: "struct",
        statics: {
            valueInRange: function (value, min, max) {
                return (value >= min) && (value <= max);
            },
            rectOverlap: function (A, B) {
                var xOverlap = Test.Rectange.valueInRange(A.x, B.x, ((B.x + B.width) | 0)) || Test.Rectange.valueInRange(B.x, A.x, ((A.x + A.width) | 0));

                var yOverlap = Test.Rectange.valueInRange(A.y, B.y, ((B.y + B.height) | 0)) || Test.Rectange.valueInRange(B.y, A.y, ((A.y + A.height) | 0));

                return xOverlap && yOverlap;
            },
            createFromHTMLElement: function (element) {
                if (element == null) {
                    return new Test.Rectange.ctor();
                }

                var obj = $(element);
                return Bridge.merge(new Test.Rectange.ctor(), {
                    x: parseInt(obj.css("left")),
                    y: parseInt(obj.css("top")),
                    width: parseInt(obj.css("width")),
                    height: parseInt(obj.css("height"))
                } );
            },
            getDefaultValue: function () { return new Test.Rectange(); }
        },
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        $ctor1: function (x, y, width, height) {
            this.$initialize();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        ctor: function () {
            this.$initialize();
        },
        getHashCode: function () {
            var hash = 17;
            hash = hash * 23 + 3653948339;
            hash = hash * 23 + (this.x == null ? 0 : Bridge.getHashCode(this.x));
            hash = hash * 23 + (this.y == null ? 0 : Bridge.getHashCode(this.y));
            hash = hash * 23 + (this.width == null ? 0 : Bridge.getHashCode(this.width));
            hash = hash * 23 + (this.height == null ? 0 : Bridge.getHashCode(this.height));
            return hash;
        },
        equals: function (o) {
            if (!Bridge.is(o, Test.Rectange)) {
                return false;
            }
            return Bridge.equals(this.x, o.x) && Bridge.equals(this.y, o.y) && Bridge.equals(this.width, o.width) && Bridge.equals(this.height, o.height);
        },
        $clone: function (to) {
            var s = to || new Test.Rectange();
            s.x = this.x;
            s.y = this.y;
            s.width = this.width;
            s.height = this.height;
            return s;
        }
    });

    Bridge.define("Test.Directory", {
        inherits: [Test.FileExplorerNode],
        statics: {
            getDirectories: function (path) {
                if (Bridge.referenceEquals(path, Test.FileExplorer.DesktopPath)) {
                    return [System.String.format("{0}/New Folder", path)];
                }

                return null;
            },
            getFiles: function (path) {
                if (Bridge.referenceEquals(path, Test.FileExplorer.DesktopPath)) {
                    return [System.String.format("{0}/iexplore.exe", path), System.String.format("{0}/Notepad.exe", path), System.String.format("{0}/cmd.exe", path)];
                }

                return null;
            }
        }
    });

    Bridge.define("Test.File", {
        inherits: [Test.FileExplorerNode],
        statics: {
            readAllText: function (path) {
                return null;
            },
            readAllLines: function (path) {
                return null;
            },
            readAllBytes: function (path) {
                return null;
            },
            writeAllBytes: function (path, bytes) {

            },
            writeAllLines: function (path, contents) {

            },
            writeAllText: function (path, contents) {

            }
        }
    });

    Bridge.define("Test.FormBrowser", {
        inherits: [Test.Form],
        config: {
            properties: {
                Content: null,
                URL: null
            }
        },
        navigate: function (url) {
            if (!System.String.startsWith(url.toLowerCase(), "http") && !System.String.startsWith(url.toLowerCase(), "file:///")) {
                url = System.String.concat("http://", url);
            }
            this.setURL(url);
            if (this.isVisible()) {
                this.getContent().src = this.getURL();
            }
        },
        initialise: function () {
            this.setContent(document.createElement('iframe'));

            this.fillControlWithParent(this.getContent(), 6, 6);

            this.setText("Quick Search");

            this.getBody().appendChild(this.getContent());
        },
        onShowed: function () {
            if (!Bridge.referenceEquals(this.getURL(), this.getContent().src)) {
                this.getContent().src = this.getURL();
            }
        }
    });

    Bridge.define("Test.FormConsole", {
        inherits: [Test.Form],
        commandPanel: null,
        commandInput: null,
        commandLines: null,
        line: -1,
        setCommandLineElement: function (element) {
            if (Bridge.referenceEquals(element.tagName.toLowerCase(), "span")) {
                Test.Form.setInternalLabel(element);
                $(element).css("user-select", "text");

                element.addEventListener("mousemove", function (ev) {
                    element.style.cursor = "text";
                    ev.stopPropagation();
                });
                element.addEventListener("click", $_.Test.FormConsole.f1);
            }

            element.style.backgroundColor = "black";
            element.style.height = "24px";
            element.style.padding = "0";
            element.style.color = "white";
            element.style.margin = "0";
            element.style.borderStyle = "none";
            element.style.fontFamily = "monospace";
            element.style.fontSize = "12pt";

            $(element).on("focus", function () {
                element.style.outline = "0";
            });
        },
        initialise: function () {
            this.commandPanel = document.createElement('div');
            this.commandPanel.style.backgroundColor = "black";
            this.commandPanel.style.overflow = "auto";

            this.commandPanel.addEventListener("mousemove", Bridge.fn.bind(this, $_.Test.FormConsole.f2));

            this.commandLines = new (System.Collections.Generic.List$1(HTMLSpanElement))();

            this.fillControlWithParent(this.commandPanel, 2, 2);

            this.commandInput = Bridge.merge(document.createElement('input'), {
                type: "text"
            } );

            this.fillHorizontalControlWithParent(this.commandInput, 2);

            this.setCommandLineElement(this.commandInput);

            this.commandInput.addEventListener("keydown", Bridge.fn.bind(this, $_.Test.FormConsole.f3));

            this.incrementLine();

            this.commandPanel.appendChild(this.commandInput);

            this.commandPanel.addEventListener("click", Bridge.fn.bind(this, $_.Test.FormConsole.f4));

            this.getBody().appendChild(this.commandPanel);

            this.setWidth("677px");
            this.setHeight("392px");
        },
        onShowed: function () {
            this.commandInput.focus();
        },
        incrementLine: function () {
            var cmd = this.commandInput.value;
            if (cmd.length > 0) {
                this.commandInput.value = "";

                var SpanText = document.createElement('span');
                this.fillHorizontalControlWithParent(SpanText, 2);

                this.setCommandLineElement(SpanText);
                SpanText.innerHTML = cmd;
                SpanText.style.top = System.String.concat((((((parseInt(this.commandInput.style.height) * this.line) | 0)) + 3) | 0), "px");
                this.commandPanel.appendChild(SpanText);
                this.commandLines.add(SpanText);
            }
            this.line = (this.line + 1) | 0;
            this.commandInput.style.top = System.String.concat((((parseInt(this.commandInput.style.height) * this.line) | 0)), "px");
            this.commandPanel.scrollTop = this.commandPanel.scrollHeight;

            if (Bridge.referenceEquals(cmd.toLowerCase(), "clear")) {
                this.clear();
            }
        },
        clear: function () {
            this.line = -1;
            this.commandInput.value = "";

            for (var i = 0; i < this.commandLines.getCount(); i = (i + 1) | 0) {
                if (this.commandLines.getItem(i) != null) {
                    this.commandLines.getItem(i).remove();
                }
            }
            this.commandLines = new (System.Collections.Generic.List$1(HTMLSpanElement))();

            this.incrementLine();
        }
    });

    Bridge.ns("Test.FormConsole", $_);

    Bridge.apply($_.Test.FormConsole, {
        f1: function (ev) {
            ev.stopPropagation();
        },
        f2: function (ev) {
            this.commandPanel.style.cursor = "text";
            ev.stopPropagation();
        },
        f3: function (ev) {
            var kev = ev;

            if (kev.keyCode === 13) {
                this.incrementLine();
            }
        },
        f4: function (ev) {
            this.commandInput.focus();
        }
    });

    Bridge.define("Test.FormNotePad", {
        inherits: [Test.Form],
        config: {
            properties: {
                NotePadContent: null
            }
        },
        initialise: function () {
            this.setNotePadContent(document.createElement('textarea'));

            this.fillControlWithParent(this.getNotePadContent());

            this.getNotePadContent().style.resize = "none";

            this.getBody().appendChild(this.getNotePadContent());
        }
    });
});
