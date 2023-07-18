"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTag = exports.mapGender = exports.mapRole = void 0;
var Role;
(function (Role) {
    Role["CUSTOMER"] = "CUSTOMER";
    Role["COMPANY"] = "COMPANY";
})(Role || (Role = {}));
function mapRole(role) {
    return role;
}
exports.mapRole = mapRole;
//Enum gender
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["UNSPECIFIED"] = "UNSPECIFIED";
})(Gender || (Gender = {}));
function mapGender(gender) {
    return gender;
}
exports.mapGender = mapGender;
var Tag;
(function (Tag) {
    Tag["MINIMALMODERN"] = "MINIMALMODERN";
    Tag["CONTEMPORARYMODERN"] = "CONTEMPORARYMODERN";
    Tag["MODERNLUXURY"] = "MODERNLUXURY";
    Tag["MODERNSTYLE"] = "MODERNSTYLE";
    Tag["MIDCENTURYMODERN"] = "MIDCENTURYMODERN";
    Tag["VINTAGESTYLE"] = "VINTAGESTYLE";
    Tag["LOFTINDUSTRALSTYLE"] = "LOFTINDUSTRALSTYLE";
    Tag["SCANDINAVIANSTYLE"] = "ARTDECO";
    Tag["ARTDECO"] = "ARTDECO";
    Tag["MIXANDMATCH"] = "MIXANDMATCH";
})(Tag || (Tag = {}));
function mapTag(tag) {
    return tag;
}
exports.mapTag = mapTag;
//# sourceMappingURL=index.js.map