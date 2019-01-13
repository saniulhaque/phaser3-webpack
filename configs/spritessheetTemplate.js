const path = require('path');
const pkg = require('./../package.json');

function jsonTextureTemplate(data) {
  const spriteObj = {};

  // Create frame data for each sprite.
  spriteObj.frames = {};

  data.sprites.forEach(sprite => {
    let frameName;
    const entry = {
      frame: {
        x: sprite.x,
        y: sprite.y,
        w: sprite.width,
        h: sprite.height
      }
    };

    if (sprite.frame_name) {
      frameName = sprite.frame_name;
    } else if (sprite.source_image) {
      frameName = path.basename(sprite.source_image);
    } else {
      frameName = sprite.name;
    }
    const strings = frameName.split('.');
    strings.splice(strings.length - 1, 1);
    const finalName = strings.join().replace(',', '.');
    spriteObj.frames[finalName] = entry;
  });

  // Create the meta data.
  spriteObj.meta = {
    app: pkg.name,
    version: pkg.version,
    image: data.spritesheet.image,
    scale: 1,
    size: {
      w: data.spritesheet.width,
      h: data.spritesheet.height
    }
  };

  // Stringify the spriteObj
  const retStr = JSON.stringify(spriteObj, null, 4);

  // Return the stringified JSON
  return retStr;
}

// Export our JSON texture template
module.exports = jsonTextureTemplate;
