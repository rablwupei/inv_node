package inv_java;

import com.google.gson.Gson;

public class Main {
	
	private class Person {
	    public String name;

	    public Person(String name) {
	        this.name = name;
	    }
	}

	public static void main(String[] args) {
		System.out.println("hello inv");
		
		Gson g = new Gson();

		Person person = (Person) g.fromJson("{\"name\": \"John\"}", Person.class);
		System.out.println(person.name); //John

		System.out.println(g.toJson(person)); // {"name":"John"}
	}

}
