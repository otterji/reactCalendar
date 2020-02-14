import axios from "axios";
import { url as _url } from "../../url";

export const IsChannel = async (_id: string) => {
  let _isChannel: string = "";
  try {
    const resIsChannel = await axios({
      method: "get",
      url: `${_url}/member/isExist/${_id}`,
      data: {
        id: _id
      }
    });
    const data = resIsChannel.data.count;
    _isChannel = data ? "channel" : "member";
  } catch (err) {
    console.log(err);
  }
  return _isChannel;
};
