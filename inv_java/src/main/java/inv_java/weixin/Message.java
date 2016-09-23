package inv_java.weixin;

public class Message {
	
	public String msg;
	
	public Message(String msg) {
		this.msg = msg;
	}
	
	public void send() {
        Weixin.send(this);
	}
	
	@Override
	public String toString() {
		return msg;
	}

}
