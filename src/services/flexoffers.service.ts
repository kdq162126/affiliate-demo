import flexoffers from 'flexoffers';

class FlexoffersService {
    constructor() {
        flexoffers.init(process.env.FLEXOFFERS_APIKEY!);
    }

    async getAdvertisers() {
        try {
            const advertisers = await flexoffers.advertisers.getAdvertisers({
                programStatus: 'approved',
                applicationStatus: 'approved',
                sortColumn: 'lastCommissionUpdated',
                sortOrder: 'DESC',
                page: 1,
                pageSize: 100
            });
            return advertisers.results;

        } catch (error) {
            console.error('Error getting advertisers:', error);
            throw error;
        }
    }
}

export default FlexoffersService;