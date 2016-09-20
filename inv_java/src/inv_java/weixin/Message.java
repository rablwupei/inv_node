package inv_java.weixin;

import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.sun.javafx.collections.MappingChange.Map;

import inv_java.Manager;

public class Message {
	
	public void send(String msg) throws Exception {
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        String access_token;
        
		{
			String gettokenUrl = String.format("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s", 
					Weixin.corpID, Weixin.secret);
			final HttpGet request1 = new HttpGet(gettokenUrl);
	        Future<HttpResponse> future = Manager.httpclient.execute(request1, null);
	        HttpResponse response1 = future.get();
	        String body = EntityUtils.toString(response1.getEntity(), "UTF-8");
	        System.out.println(new Date() + " " +  body);
			
	        HashMap<String, Object> map = gson.fromJson(body, HashMap.class);
	        access_token = (String) map.get("access_token");
		}
        
        {
//            {
//            	   "touser": "UserID1|UserID2|UserID3",
//            	   "toparty": " PartyID1 | PartyID2 ",
//            	   "totag": " TagID1 | TagID2 ",
//            	   "msgtype": "text",
//            	   "agentid": 1,
//            	   "text": {
//            	       "content": "Holiday Request For Pony(http://xxxxx)"
//            	   },
//            	   "safe":0
//            	}

            JsonObject text = new JsonObject();
            text.addProperty("content", "api发发发!!! " + msg);
            
            JsonObject map = new JsonObject();
            map.addProperty("touser", "@all");
            map.addProperty("toparty", "");
            map.addProperty("totag", "");
            map.addProperty("msgtype", "text");
            map.addProperty("agentid", 0);
            map.add("text", text);
            map.addProperty("safe", 0);
            String post = gson.toJson(map);
            
	        System.out.println(new Date() + " " +  post);

            String msgUrl = String.format("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s", access_token);
            final HttpPost request1 = new HttpPost(msgUrl);
            request1.setEntity(new StringEntity(post, "UTF-8"));
            request1.setHeader("Content-type", "application/json");
	        Future<HttpResponse> future = Manager.httpclient.execute(request1, null);
	        HttpResponse response1 = future.get();
	        String body = EntityUtils.toString(response1.getEntity(), "UTF-8");
	        System.out.println(new Date() + " " +  body);
	        
        }
	}

}
