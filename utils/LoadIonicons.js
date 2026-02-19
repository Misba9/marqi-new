export function loadIonicons() {
  const ioniconScriptModule = document.createElement("script");
  ioniconScriptModule.type = "module";
  ioniconScriptModule.src =
    "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
  document.body.appendChild(ioniconScriptModule);

  const ioniconScriptNoModule = document.createElement("script");
  ioniconScriptNoModule.setAttribute("nomodule", "");
  ioniconScriptNoModule.src =
    "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
  document.body.appendChild(ioniconScriptNoModule);
}
