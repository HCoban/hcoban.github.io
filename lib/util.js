const Util = {
  scale(vec, l) {
    return [vec[0] * l, vec[1] * l];
  },

  velocity(radius, min, org) {
    if (min) {
      let disX = min.pos[0] - org.pos[0];
      let disY = min.pos[1] - min.pos[1];
      var degree = Math.atan(disY/disX);
    } else {
      var degree = 2 * Math.PI * Math.random();
    }
    return this.scale([Math.sin(degree), Math.cos(degree)], (100/radius));
  },

  distance(pos1, pos2) {
    let disX = pos1[0] - pos2[0];
    let disY = pos1[1] - pos2[1];

    return Math.pow((Math.pow(disX, 2) + Math.pow(disY, 2)), 0.5);
  },

  changeVec(thisObject, otherObject) {
    let first;
    let second;

    if (thisObject.pos[0] < otherObject.pos[0]) {
      first = 1 * Math.PI;
    } else {
      first = -1 * Math.PI;
    }

    if (thisObject.pos[1] < otherObject.pos[1]) {
      second = 1 * Math.PI;
    } else {
      second = -1 * Math.PI;
    }

    return [first, second];
  }
};

export default Util;
