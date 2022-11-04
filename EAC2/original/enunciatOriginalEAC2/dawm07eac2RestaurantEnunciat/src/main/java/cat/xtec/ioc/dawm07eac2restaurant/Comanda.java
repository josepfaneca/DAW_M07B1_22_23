package cat.xtec.ioc.dawm07eac2restaurant;

import java.util.List;
import javax.ejb.Stateful;

/**
 *
 * @author German
 */
@Stateful
public class Comanda implements ComandaLocal {
    private List<Article> articlesAfegits;

    @Override
    public List<Article> getArticlesAfegits() {
        return articlesAfegits;
    }

    @Override
    public void setArticlesAfegits(List<Article> articlesAfegits) {
        this.articlesAfegits = articlesAfegits;
    }

}
