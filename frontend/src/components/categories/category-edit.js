import {OperationsService} from "../../services/operations-service.js";
import {UrlUtils as urlUtils} from "../../utils/url-utils.js";

export class CategoryEdit {
    constructor(parseHash) {
        const { params } = parseHash();
        this.params = params;
        this.category = urlUtils.getUrlHashPart();
        this.categoryInput = document.getElementById("category-input");
        this.categorySaveElement = document.getElementById('category-save');
        document.getElementById('button-back').addEventListener('click', () => {
            window.history.back();
        });

        this.outputCategory().then();
    }

    /* 1. Если input пустой, кнопка сохранить не активна, использовать onchage
    *  2. При нажатии на кнопку сохранить, делается запрос на backend для сохранения и переводится на
    * страницу '#/operations/edit' (посмотреть видео, как сделать, что если не были внесены изменения,
    * просто перевести на следующую страницу
    * */

    async outputCategory() {
        try {
            const categoryResult = await OperationsService.getCategory(`/${this.category}/${this.params.id}`);
            if (categoryResult) {
                this.categoryInput.value = categoryResult.title;
            } else if (categoryResult.error) {
                console.log(categoryResult.error);
                location.href = '#/operations';
            }
        } catch (error) {
            console.log(error);
        }
    }
}