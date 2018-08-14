const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  new() {
    return (this._isStandard()  || this._isPremium() || this._isAdmin());

  }

  create() {
    return this.new();
  }

  edit() {
    return this.new() &&
    this.record && (this._isOwner() || this._isStandard());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
