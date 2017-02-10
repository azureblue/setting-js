var Setting = {};

Setting.wrapperClass = "setting_wrapper";
Setting.labelClass = "setting_label";
Setting.idCount = 0;
Setting.genId = () => "setting_##_" + Setting.idCount++;

var genSettingWrapper = (labelText) => {
    var label = genElement("div", {class: Setting.wrapperClass});
    label.textContent = labelText;
};

var genSettingLabel = () => genElement("label", {class: Setting.labelClass});
var genElement = (tag, attr) => {
    var el = document.createElement(tag);
    el.setAttribute("id", genId());
    if (attr)
        Object.keys(attr).forEach(pr => el.setAttribute(pr, attr[pr]));
    return el;
};

var getId = (el) => el.getAttribute("id");
var elemById = id => document.getElementById(id);

function InputSetting(labelText, inputAttributes, valueMapper) {
    if (inputAttributes["id"])
        throw "Id attribute must not be specified.";
    
    var inputId;
    
    this.generate = () => {
        var wrapper = genSettingWrapper();
        var label = genSettingLabel(labelText);
        var input = genElement("input", inputAttributes);
        inputId = getId(input);
        wrapper.appendChild(label);
        label.appendChild(input);
        return wrapper;
    };    
    this.get = () => valueMapper(elemById(inputId).value);
};

