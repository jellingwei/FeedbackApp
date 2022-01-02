package weiling;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("SELECT f FROM weiling.Feedback f WHERE f.email = ?1 AND f.contact = ?2")
    List<Feedback> findByEmailAndContact(String email, String contact);
}
