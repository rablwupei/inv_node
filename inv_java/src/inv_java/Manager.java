package inv_java;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.LogFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import inv_java.tools.Http;
import inv_java.weixin.Message;

public class Manager {

	public static void start(String[] args) {
		app.init(args);
		
//		startTimer();
		
		try {
			String json = IOUtils.toString(app.listFile.toURI(), "UTF-8");
			Gson gson = new GsonBuilder().setLenient().create();
			app.log(gson.toJson(gson.fromJson(json, Object.class)));
		} catch (Exception e) {
			app.logError(e, "json read error");
		}
	}
	
	public static void startTimer() {
		app.scheduler.scheduleWithFixedDelay(new Runnable() {
			@Override
			public void run() {
				onTick();
			}
		}, 1, 100000, TimeUnit.SECONDS);
		app.log("start timer");
	}
	
	public static void onTick() {
		sendRequest();
	}
	
	public static void sendRequest() {
        String body = new Http("http://hq.sinajs.cn/list=sz131810").getBody();
		new Message(body).send();
	}
	
	

}
