package weiling;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.client.ResourceAccessException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class FeedbackController {
    private final FeedbackRepository repository;

    FeedbackController(FeedbackRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/feedback")
    Feedback newFeedback(@RequestBody Feedback newFeedback) {
        return repository.save(newFeedback);
    }

    @GetMapping("/feedbacks")
    List<Feedback> one(@RequestParam(name="email") String email, @RequestParam(name="contact") String contact) {
        List<Feedback> feedbacks = repository.findByEmailAndContact(email, contact);
        List<Feedback> result = new ArrayList<>();

        RestTemplateBuilder builder = new RestTemplateBuilder();
        RestTemplate restTemplate = builder.setConnectTimeout(Duration.ofMillis(15000))
                .setReadTimeout(Duration.ofMillis(15000))
                .build();

        for (Feedback feedback : feedbacks) {
            String uri = "http://processfeedback.atwebpages.com/submit.php?feedback= " + feedback.getDescription();
            Map<String, String> response;
            try {
                response = restTemplate.getForObject(uri, Map.class);
                String feedbackStatus = response.get("sentiment");
                if (feedbackStatus.equals("positive")) {
                    feedback.setStatus("Accepted");
                } else if (feedbackStatus.equals("negative")) {
                    feedback.setStatus("Rejected");
                } else {
                    feedback.setStatus("Unknown (Try again later)");
                }
            } catch (ResourceAccessException ex) {

                // suppress timeouts
                feedback.setStatus("Unknown (Try again later)");
            } finally {
                result.add(feedback);
            }
        }

        return result;
    }
}
