package inv_java;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import org.apache.commons.io.FileUtils;
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
    public static Gson gson;
	
	static Log log;
	
	public static boolean init(String[] args) {
    	log = LogFactory.getLog(Manager.class);
        app.log("inv v1.0.0");

        scheduler = Executors.newScheduledThreadPool(1);
		jarFile = new File(Manager.class.getProtectionDomain().getCodeSource().getLocation().getPath());
		jarPath = jarFile.getParentFile();
        gson = new GsonBuilder().disableHtmlEscaping().create();

        try {
            String json;
            if (args.length == 0) {
                app.isEditor = true;
                json  = IOUtils.toString(app.class.getResourceAsStream("list.json"), "UTF-8");
            } else {
                app.isEditor = false;
                json = FileUtils.readFileToString(new File(args[0]), "utf-8");
            }
            app.log(gson.toJson(gson.fromJson(json, Object.class)));
        } catch (IOException e) {
            app.logError(e, "list.json not found");
        }
        return true;
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
