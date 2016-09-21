package inv_java;

import java.io.File;
import java.io.InputStream;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class app {

	public static File jarFile;
	public static File jarPath;
	public static ScheduledExecutorService scheduler;
	public static boolean isEditor;
	public static File listFile;
	
	static Log log;
	
	public static void init(String[] args) {
    	log = LogFactory.getLog(Manager.class);
		scheduler = Executors.newScheduledThreadPool(1);
		jarFile = new File(Manager.class.getProtectionDomain().getCodeSource().getLocation().getPath());
		jarPath = jarFile.getParentFile();

		if (args.length == 0) {
			app.isEditor = true;
			listFile = new File(jarFile.getParentFile(), "assets/list.json");
		} else {
			app.isEditor = false;
			listFile = new File(args[0]);
		}
		
		app.log("inv v1.0.0");
	}

	public static void log(Object msg) {
		log.info(msg);
	}
	
	public static void log(String msg, Object... args) {
		log.info(String.format(msg, args));
	}
	
	public static void logError(Throwable t, String msg, Object... args) {
		log.error(String.format(msg, args), t);
	}

	public static void logError(Throwable t, Object msg) {
		log.error(msg, t);
	}
	

}
