package inv_java.tools;

import java.util.HashMap;
import java.util.concurrent.Future;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.impl.nio.conn.PoolingNHttpClientConnectionManager;
import org.apache.http.impl.nio.reactor.DefaultConnectingIOReactor;
import org.apache.http.nio.reactor.ConnectingIOReactor;
import org.apache.http.nio.reactor.IOReactorException;
import org.apache.http.util.EntityUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import inv_java.Manager;

public class Http {
	
	private static CloseableHttpAsyncClient httpclient;
	private static CloseableHttpAsyncClient getClient() {
		if (httpclient == null) {
			try {
				ConnectingIOReactor ioReactor = new DefaultConnectingIOReactor();
		        PoolingNHttpClientConnectionManager cm = new PoolingNHttpClientConnectionManager(ioReactor);
		        CloseableHttpAsyncClient client = HttpAsyncClients.custom().setConnectionManager(cm).build();
		        client.start();
		        httpclient = client;
			} catch (Exception e) {
				Manager.logError("httpclear create error", e);
			}
		}
		return httpclient;
	}
	
	private static Gson gson;
	private static Gson getGson() {
		if (gson == null) {
			gson = new GsonBuilder().disableHtmlEscaping().create();
		}
		return gson;
	}
	
	public String url;
	public String post;
	
	public Http(String url) {
		this.url = url;
	}

	public Http(String url, String post) {
		this.url = url;
		this.post = post;
	}

	public Http(String url, JsonElement post) {
		this.url = url;
		setPost(post);
	}
	
	public void setPost(JsonElement ele) {
		post = getGson().toJson(ele);
	}

	public String getBody() {
		try {
			return doExecute();
		} catch (Exception e) {
			Manager.logError("http error. url = " + url, e);
			return null;
		}
	}
	
	public HashMap<String, Object> getMap() {
		String body = getBody();
		return getGson().fromJson(body, HashMap.class);
	}
	
	public <T> T getJson(Class<T> classOfT) {
		String body = getBody();
		return getGson().fromJson(body, classOfT);
	}
	
	protected String doExecute() throws Exception {
		HttpUriRequest request;
		if (StringUtils.isEmpty(post)) {
			request = new HttpGet(url);
		} else {
            final HttpPost request1 = new HttpPost(url);
            request1.setEntity(new StringEntity(post, "UTF-8"));
            request1.setHeader("Content-type", "application/json");
            request = request1;
		}
        Future<HttpResponse> future = getClient().execute(request, null);
        HttpResponse response1 = future.get();
        String body = EntityUtils.toString(response1.getEntity(), "UTF-8");
		if (StringUtils.isEmpty(post)) {
	        Manager.log(url + "\n" + body);
		} else {
	        Manager.log(url + "\n" + post + "\n" + body);
		}
        return body;
	}
	
}
