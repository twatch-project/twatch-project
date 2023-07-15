"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGender = exports.mapRole = void 0;
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
    Gender["UNSPECIFUED"] = "UNSPECIFUED";
})(Gender || (Gender = {}));
function mapGender(gender) {
    return gender;
}
exports.mapGender = mapGender;
//# sourceMappingURL=index.js.map