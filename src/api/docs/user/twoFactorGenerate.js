import React from "react";

import Method from "../../method.js";
import Example from "../../example.js";

import IDParameter from "./idParameter.js";
import AccessDeniedResult from "../../accessDeniedResult.js";

export default class TwoFactorGenerator extends Method {
  uri() { return "/api/v1/users/:id/2fa"; }
  version() { return 1; }
  httpMethod() { return "POST"; }
  group() { return "user"; }

  description() {
    return (
      <div>
        <p>
          This creates a new set of two-factor TOTP authentication credentials
          for the user. In order to activate a credential set generated by this
          URL, you must send a valid key confirmation endpoint.
        </p>
        <p>
          In acccordance with RFC6238 the time step (X) is 30 seconds and the
          starting time (T0) is the unix epoch. This means it should work by
          default with most common authenticator apps, such as Google
          Authenticator. We allow a "drift" of five seconds in the future and
          twenty seconds in the past for the timestamp. Devices whose times
          differ from UTC by more than those amounts will not generate valid codes.
        </p>
        <p>
          In addition to the key, which we provide in the response along with
          a URL to a QR code, the user is issued recovery codes which he or she
          should use in the event that they lose their mobile device.
        </p>
      </div>
    );
  }
  parameters() { return [ new IDParameter() ]; }
  examples() { return [ new SuccesfulExample(), new AccessDeniedResult() ]; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {
      key: "{:@0mTCO;w(}]pB*qzDhZExVpgGOh3EX",
      qr: "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=%7B%3A%400mTCO%3Bw(%7D%5DpB*qzDhZExVpgGOh3EX",
      recovery_codes: [
        "85b2eaf17a95",
        "3af4acda01e7",
        "cca4d37d1ef7",
        "f2d6e2849cf3",
        "e6125522460a",
        "203f7bd4a4e0",
        "b0dfec5fd085",
        "2a9582be1587",
        "1d0310d6359a",
        "28d5968184bc",
        "5b8b2e6bbd6e",
        "9f96ed35ba9d",
        "54649ba2701c",
        "e53ce7f984e7",
        "c1d2af29fbe7",
        "4d9b1dbf8e1b"
      ],
      user_id: 1,
      verified: false
    }
  }
}
