const path = require("path");

module.exports = {
  icons: [
    {
      id: "eva",
      name: "Eva Icons",
      contents: [
        {
          files: path.resolve(
            __dirname,
            "eva-icons/package/icons/+(fill|outline)/svg/*.svg"
          )
        }
      ],
      projectUrl: "https://akveo.github.io/eva-icons/",
      license: "MIT",
      licenseUrl: "https://github.com/akveo/eva-icons/blob/master/LICENSE.txt"
    }
  ]
};
