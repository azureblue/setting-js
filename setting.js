var Setting = {};

Setting.wrapperClass = "setting_wrapper";
Setting.labelClass = "setting_label";
Setting.idCount = 0;

var genSettingWrapper = () => genElement("div", {class: Setting.wrapperClass});
var genSettingLabel = labelText => genElement("label", {class: Setting.labelClass}, labelText);
var genElement = (tag, attr, txt) => {
    var el = document.createElement(tag);
    el.setAttribute("id", genId());
    if (attr)
        Object.keys(attr).forEach(pr => el.setAttribute(pr, attr[pr]));
    if (txt)
        el.textContent = txt;
    return el;
};

var getId = el => el.getAttribute("id");
var elemById = id => document.getElementById(id);
var forEachEntry = (obj, action) => Object.keys(obj).forEach(pr => action(pr, obj[pr]));
var checkNoIdInAttrMap = (obj) => {
     if (obj["id"])
        throw "Id attribute must not be specified.";
};
var genId = () => "setting_##_" + Setting.idCount++;

function LabeledSetting(labelText, element) {
    this.generate = () => {
        var wrapper = genSettingWrapper();
        var label = genSettingLabel(labelText);
        wrapper.appendChild(label);
        wrapper.appendChild(element);
        return wrapper;
    };
}

function InputSetting(labelText, inputAttributes, valueMapper) {
    checkNoIdInAttrMap(inputAttributes);    
    var inputId;
    
    this.generate = () => {
        var input = genElement("input", inputAttributes);
        inputId = getId(input);
        return new LabeledSetting(labelText, input).generate();        
    };    
    
    this.get = () => valueMapper(elemById(inputId).value);
};

function SelectSetting(labelText, valueTextMap, selectAttrs, valueMapper) {
    checkNoIdInAttrMap(selectAttrs);
    var selectId;
    
    this.generate = () => {
        var select = genElement("select", selectAttrs);
        forEachEntry(valueTextMap, (va, txt) => select.appendChild(genElement("option", {value: va}, txt)));
        selectId = getId(select);
        return new LabeledSetting(labelText, select).generate();
    };
    
    this.get = () => valueMapper(elemById(selectId).value);
}
