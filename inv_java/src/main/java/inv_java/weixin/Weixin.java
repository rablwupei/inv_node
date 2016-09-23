package inv_java.weixin;

import java.util.HashMap;

import com.google.gson.JsonObject;

import inv_java.tools.Http;

public class Weixin {
	
	public static final String corpID = "wx49ef3962c2f3a2c0";
	public static final String secret = "l4mKdYE-C1VCROkcjmYoMv8dOQ3w1mF35L0dePiRXbL_SW5MMG7AN5tnURhAGvmb";

	public static void send(Message msg) {
		String access_token;
        
		{
			String gettokenUrl = String.format("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s", 
					Weixin.corpID, Weixin.secret);
	        Http http = new Http(gettokenUrl);
	        HashMap<String, Object> map = http.getMap();
	        access_token = (String) map.get("access_token");
		}
        
        {
            JsonObject text = new JsonObject();
            text.addProperty("content", "api发发发!!! " + msg.toString());
            
            JsonObject post = new JsonObject();
            post.addProperty("touser", "wupei");
            post.addProperty("toparty", "");
            post.addProperty("totag", "");
            post.addProperty("msgtype", "text");
            post.addProperty("agentid", 0);
            post.add("text", text);
            post.addProperty("safe", 0);
            
            String msgUrl = String.format("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s", access_token);
            Http http = new Http(msgUrl, post);
	        HashMap<String, Object> map = http.getMap();
        }
	}
	
}
