const tensorflow = require('@tensorflow/tfjs-node-gpu');
const cocoSsd = require('@tensorflow-models/coco-ssd');

let model_ = null;

const detect = async (x) => {
  if (!model_) {
    model_ = await cocoSsd.load();
  }

  return model_.detect(x);
};

module.exports = {detect};
