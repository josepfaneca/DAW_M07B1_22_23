package cat.xtec.ioc.dawm07eac2restaurant;

import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author German
 */
@Local
public interface ComandaLocal {
    public List<Article> getArticlesAfegits();
    public void setArticlesAfegits(List<Article> articlesAfegits);
}
