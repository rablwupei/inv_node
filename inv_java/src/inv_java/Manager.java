package inv_java;

import java.util.concurrent.TimeUnit;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import inv_java.tools.Http;
import inv_java.weixin.Message;

public class Manager {
	
	public static int sum(int a, int b)
	{
		return a + b;
	}
	

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
		
		app.log("abcc");
		try {
			ScriptEngineManager engineManager = new ScriptEngineManager();
			ScriptEngine engine = engineManager.getEngineByName("nashorn");

			long time = System.currentTimeMillis();
			for (int i = 0; i < 50000; i++) {
				engine.eval("function sum(a,b) { return a+b; }");
				engine.eval("sum(1,2);");
			}
			System.out.println((System.currentTimeMillis() - time) / 1000.0);
			
			time = System.currentTimeMillis();
			for (int i = 0; i < 50000; i++) {
				sum(1, 2);
			}
			System.out.println((System.currentTimeMillis() - time) / 1000.0);

			time = System.currentTimeMillis();
			for (int i = 0; i < 50000; i++) {

			}
			System.out.println((System.currentTimeMillis() - time) / 1000.0);
			
		} catch (Exception e) {
			app.logError(e, "js error");
		}
		app.log("abcc2");
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
