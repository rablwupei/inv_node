package inv_java;

import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.output.ThresholdingOutputStream;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;

import inv_java.tools.Http;
import inv_java.weixin.Message;

public class Manager {
	
    public static ScheduledExecutorService scheduler;
    private static Log log;
    
    public static void start() {
    	log = LogFactory.getLog(Manager.class);
		scheduler = Executors.newScheduledThreadPool(1);
		
		log("inv v1.0.0");
		
		startTimer();
	}
	
	public static void startTimer() {
		scheduler.scheduleWithFixedDelay(new Runnable() {
			@Override
			public void run() {
				onTick();
			}
		}, 1, 100000, TimeUnit.SECONDS);
		log("start timer");
	}
	
	public static void log(String msg) {
		log.info(msg);
	}
	
	public static void logError(String msg, Throwable t) {
		log.error(msg, t);
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
        String body = new Http("http://hq.sinajs.cn/list=sz131810").getBody();
		new Message(body).send();
	}
	
	

}
