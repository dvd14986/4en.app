var reader;
var files =[];
var emptyFileList;
var fileName;
var fileType;
var fileData;


function presetEnv(){
    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
    document.getElementById('files').addEventListener('change', handleFileSelect_button, false);
    emptyFileList=document.getElementById('files').files;
    resetStoreResult();
}


function resetStoreResult(){
    document.getElementById("hashResult").style.display="none";
    document.getElementById("errorTX").style.display="none";
    document.getElementById("txhash").innerHTML="";
    document.getElementById("txhash").style.display="";
    document.getElementById("eth_exp").innerHTML="";
    document.getElementById("eth_exp").style.display="none";
    document.getElementById("etc_exp").innerHTML="";
    document.getElementById("etc_exp").style.display="none";
    document.getElementById("clo_exp").innerHTML="";
    document.getElementById("clo_exp").style.display="none";
    document.getElementById("ella_exp").innerHTML="";
    document.getElementById("ella_exp").style.display="none";
}


function abortRead() {
    reader.abort();
}


function errorHandler(evt) {
    switch(evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        default:
            alert('An error occurred reading this file.');
    };
}


function handleFileSelect_button(evt) {
    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onabort = function(e) {
        alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
    };
    reader.onload = function(e) {
        files=document.getElementById('files').files;
        document.getElementById('textbox').style.display='none';
        checkSize();
        checkUtf8();
    };
    if (evt.target.files[0]){
        reader.readAsArrayBuffer(evt.target.files[0]);
    }
}


function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    files = evt.dataTransfer.files; // FileList object.
    document.getElementById('files').files=files;
    document.getElementById('textbox').style.display='none';
    checkSize();
    checkUtf8();
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


function readBlob(opt_startByte, opt_stopByte) {
    files = document.getElementById('files').files;
    if (!files.length) {
        alert('Please select a file!');
    return;
    }
    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;
    var reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            document.getElementById('byte_content').textContent = evt.target.result;
            fileData=evt.target.result;
        }
    };
    var blob = file.slice(start, stop + 1);
    reader.readAsArrayBuffer(blob);
}


function checkSize(){
    var result=false;
    if (document.getElementById('files').files[0].size < 5000) {
        var output = [];
        f = files[0];
        if (f.type){
            output.push(
                '<b>File name: </b>',
                f.name,
                '<br>',
                '<b>Mime type: </b>',
                f.type,
                '<br>',
                '<b>File size: </b>',
                f.size,
                ' bytes<br>'
            );
            document.getElementById('list').innerHTML = output.join('');
            readBlob();
            result=true;
            fileName=f.name;
            fileType=f.type;
            document.getElementById("textByteSize").innerHTML=f.size+" bytes.";
        }
        else {
            alert("File type not available, unable to store it.");
            resetFile();
        }
    }
    else {
        alert("File size too big! Select a file with size less than 5000bytes");
        resetFile();
        result=false;
    }
    files=document.getElementById('files').files;
    return result;
}


function resetFile(){
        document.getElementById('files').files=emptyFileList;
        document.getElementById('byte_content').textContent="";
        document.getElementById('byte_range').textContent="";
        document.getElementById("textByteSize").innerHTML="0 bytes.";
        document.getElementById('list').innerHTML="";
        document.getElementById('textbox').style.display='block';
        document.getElementById("gotostep3").style.display="none";
        document.getElementById("store").style.display="none";
}


function savefile(){
    content=fileData;
    name=fileName;
    type=fileType;
    // Note: Ie and Edge don't support the new File constructor,
    // so it's better to construct blobs and use saveAs(blob, filename)
    var file = new File([content], name, {type: type});
    saveAs(file);
}


function textSize(){
    var field = document.getElementById("byte_content");
    var textBytes = new Blob([field.value]).size;
    if (textBytes>=5000){
        field.value=field.value.substring(0,5000);
        document.getElementById("textByteSize").innerHTML="5000 bytes.<br> You reach the maximum lenght of text!";
    }
    else {
        document.getElementById("textByteSize").innerHTML=textBytes+" bytes.";
    }
}
