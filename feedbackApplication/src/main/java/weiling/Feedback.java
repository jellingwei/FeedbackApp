package weiling;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

@Entity
@Table(indexes = {
	@Index(name="contactEmailIndex", columnList="contact, email")
})
public class Feedback {

	private @Id @GeneratedValue Long id;
	private String name;
	private String email;
	private String contact;
	private String agency;
	private String description;
	private String status;


	private Feedback() {}

	public Feedback(String name, String email, String contact, String agency, String description, String status) {
		this.name = name;
		this.email = email;
		this.contact = contact;
		this.agency = agency;
		this.description = description;
		this.status = status;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Feedback employee = (Feedback) o;
		return Objects.equals(id, employee.id) &&
			Objects.equals(name, employee.name) &&
			Objects.equals(email, employee.email) &&
			Objects.equals(contact, employee.contact) &&
			Objects.equals(agency, employee.agency) &&
			Objects.equals(description, employee.description) &&
			Objects.equals(status, employee.status);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, email, contact, agency, description, status);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() { return name; }

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAgency() {
		return agency;
	}

	public void setAgency(String agency) {
		this.agency = agency;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	@Override
	public String toString() {
		return "Employee{" +
			"id=" + id +
			", name='" + name + '\'' +
			", email='" + email + '\'' +
			", contact='" + contact + '\'' +
			", agency='" + agency + '\'' +
			", description='" + description + '\'' +
			", status='" + status + '\'' +
			'}';
	}
}