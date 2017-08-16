jest.mock('gooddata');

import * as React from 'react';
import { mount } from 'enzyme';

import { BaseChart } from '../base/BaseChart';
import { Table } from '../Table';
import { Visualization } from '../Visualization';
import { ErrorStates } from '../../constants/errorStates';
import { postpone } from '../../helpers/test_helpers';

describe('Visualization', () => {
    it('should render chart', (done) => {
        const wrapper = mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/1'}
            />
        );

        postpone(() => {
            expect(wrapper.find(BaseChart).length).toBe(1);
            done();
        });
    });

    it('should render table', (done) => {
        const wrapper = mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/2'}
            />
        );

        postpone(() => {
            expect(wrapper.find(Table).length).toBe(1);
            done();
        });
    });

    it('should trigger `onLoadingChanged` for visualization', (done) => {
        const loadingHandler = jest.fn();

        mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/1'}
                onLoadingChanged={loadingHandler}
            />
        );

        postpone(() => {
            expect(loadingHandler).toHaveBeenCalled();
            done();
        });
    });

    it('should trigger `onLoadingChanged` for table', (done) => {
        const loadingHandler = jest.fn();

        mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/2'}
                onLoadingChanged={loadingHandler}
            />
        );

        postpone(() => {
            expect(loadingHandler).toHaveBeenCalled();
            done();
        });
    });

    it('should trigger error in case of given uri is not valid', (done) => {
        const errorHandler = (value) => {
            expect(value).toEqual(ErrorStates.NOT_FOUND);
            done();
        };

        mount(
            <Visualization
                uri={'/invalid/url'}
                onError={errorHandler}
            />
        );
    });

    it('should replace date filter, if it has same id', (done) => {
        const visFilters = [
            {
                id: '/gdc/md/myproject/obj/921',
                type: 'date',
                between: [-51, 0],
                granularity: 'date'
            }
        ];

        const wrapper = mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/1'}
                filters={visFilters}
            />
        );

        postpone(() => {
            expect(wrapper.state('dataSource').afm.filters).toHaveLength(1);
            expect(wrapper.state('dataSource').afm.filters[0]).toEqual(visFilters[0]);
            done();
        });
    });

    it('should add date filter, if it has different id', (done) => {
        const visFilters = [
            {
                id: '/gdc/md/myproject/obj/922',
                type: 'date',
                between: [-51, 0],
                granularity: 'date'
            }
        ];

        const wrapper = mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/1'}
                filters={visFilters}
            />
        );

        postpone(() => {
            expect(wrapper.state('dataSource').afm.filters).toHaveLength(2);
            expect(wrapper.state('dataSource').afm.filters[1]).toEqual(visFilters[0]);
            done();
        });
    });

    it('should add attribute filter', (done) => {
        const visFilters = [
            {
                id: '/gdc/md/myproject/obj/925',
                type: 'attribute',
                in: ['11', '22', '33']
            }
        ];

        const wrapper = mount(
            <Visualization
                uri={'/gdc/md/myproject/obj/1'}
                filters={visFilters}
            />
        );

        postpone(() => {
            expect(wrapper.state('dataSource').afm.filters).toHaveLength(2);
            expect(wrapper.state('dataSource').afm.filters[0]).toEqual(visFilters[0]);
            done();
        });
    });
});
