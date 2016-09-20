package inv_java;

import java.io.IOException;
import java.util.Date;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.util.EntityUtils;

import inv_java.weixin.Message;

public class Manager {
	
    public static ScheduledExecutorService scheduler;
    public static CloseableHttpAsyncClient httpclient;
	
	public static void start() {
		printMessage("inv v1.0.0");
		scheduler = Executors.newScheduledThreadPool(1);
		httpclient = HttpAsyncClients.createDefault();
        httpclient.start();
		
		startTimer();
	}
	
	public static void startTimer() {
		scheduler.scheduleWithFixedDelay(new Runnable() {
			@Override
			public void run() {
				onTick();
			}
		}, 1, 100000, TimeUnit.SECONDS);
		printMessage("start timer");
	}
	
	public static void printMessage(String msg) {
		System.out.println(msg);
	}
	
	public static void printError(String msg) {
		
	}
	
	public static void onTick() {
		sendRequest();
	}
	
	public static void sendRequest() {
		try {
			doSendRequest();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void doSendRequest() throws Exception {
		final HttpGet request1 = new HttpGet("http://hq.sinajs.cn/list=sz131810");
        Future<HttpResponse> future = httpclient.execute(request1, null);
        HttpResponse response1 = future.get();
        String body = EntityUtils.toString(response1.getEntity());
        System.out.println(new Date() + " " +  body);
        
		try {
			new Message().send(body);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	

}
